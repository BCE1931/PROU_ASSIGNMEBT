import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { MagicCard } from "@/components/ui/magic-card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import BASE_URL from "../UTILS/config.js";
import {
  saveusername,
  saveToken,
  saveemail,
  saverefershtoken,
  saveadmin,
} from "@/index.js";

const Signup = () => {
  const [email, setemail] = useState("");
  const [username, setname] = useState("");
  const [password, setpassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const resp = await fetch(`${BASE_URL}/oauth/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          project: "prod_assignment",
          admin: isAdmin,
        }),
      });

      if (!resp.ok) throw new Error("Registration failed");

      const res = await resp.json();
      if (res.exist === false) {
        const tokenResp = await fetch(
          `${BASE_URL}/token/tokengen/${username}`,
          {
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!tokenResp.ok) throw new Error("Token creation failed");

        const tokenData = await tokenResp.json();
        saveToken(tokenData.token);
        saveusername(username);
        saverefershtoken(tokenData.refreshtoken);
        saveadmin(res.admin);

        navigate("/home");
      } else {
        toast.error("Email already exists");
      }
    } catch (e) {
      console.log("Error in register:", e);
      toast.error("Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0a0a12] to-[#000000] relative overflow-hidden text-white">
      <Card className="w-full max-w-sm border-none bg-transparent shadow-none relative z-10">
        <MagicCard
          gradientColor="#141414"
          className="p-0 rounded-2xl bg-[#0b0f1a]/90 backdrop-blur-xl border border-gray-800"
        >
          <CardHeader className="border-b border-gray-800 p-6 text-center">
            <CardTitle className="text-2xl font-bold text-indigo-300">
              Sign Up
            </CardTitle>
            <CardDescription className="text-gray-400">
              Create your account to get started
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={register} className="grid gap-4">
              <div className="grid gap-2">
                <Label className="text-gray-300">Email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label className="text-gray-300">Username</Label>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setname(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label className="text-gray-300">Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center gap-2 mt-2">
                <Checkbox
                  id="adminCheck"
                  checked={isAdmin}
                  onCheckedChange={(val) => setIsAdmin(val)}
                  className="border-gray-600 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                />
                <Label
                  htmlFor="adminCheck"
                  className="text-gray-300 cursor-pointer"
                >
                  Register as Admin
                </Label>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin" /> Creating Account...
                  </span>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="border-t border-gray-800 p-4 text-sm text-gray-400 flex justify-between">
            <a className="text-indigo-400 hover:underline">Forgot password?</a>
            <Link to="/" className="text-indigo-400 hover:underline">
              Already have an account?
            </Link>
          </CardFooter>
        </MagicCard>
      </Card>
    </div>
  );
};

export default Signup;
