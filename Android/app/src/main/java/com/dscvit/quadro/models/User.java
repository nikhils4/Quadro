package com.dscvit.quadro.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class User {
    @SerializedName("name")
    @Expose
    public String name;
    @SerializedName("email")
    @Expose
    public String email;
    @SerializedName("dob")
    @Expose
    public String dob;
    @SerializedName("gender")
    @Expose
    public String gender;
    @SerializedName("password")
    @Expose
    public String password;
    @SerializedName("experience")
    @Expose
    public Integer experience;
    @SerializedName("domain")
    @Expose
    public String domain;

    public User() {
    }

    public User(String name, String email, String dob, String gender, String password, Integer experience, String domain) {
        super();
        this.name = name;
        this.email = email;
        this.dob = dob;
        this.gender = gender;
        this.password = password;
        this.experience = experience;
        this.domain = domain;
    }


}