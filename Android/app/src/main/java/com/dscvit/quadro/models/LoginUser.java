package com.dscvit.quadro.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class LoginUser {

    @SerializedName("email")
    @Expose
    public String email;
    @SerializedName("password")
    @Expose
    public String password;

    public LoginUser() {
    }

    public LoginUser(String email, String password) {
        super();
        this.email = email;
        this.password = password;
    }

}
