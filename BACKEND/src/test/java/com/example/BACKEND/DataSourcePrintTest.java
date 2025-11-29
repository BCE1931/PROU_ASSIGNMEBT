package com.example.BACKEND;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.sql.DataSource;

@SpringBootTest
public class DataSourcePrintTest {

    @Autowired
    private DataSource dataSource;

    @Test
    public void printDataSourceUrl() throws Exception {
        System.out.println(dataSource.getConnection().getMetaData().getURL());
    }
}