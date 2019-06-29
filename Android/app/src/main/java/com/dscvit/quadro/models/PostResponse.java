package com.dscvit.quadro.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class PostResponse {

    @SerializedName("status")
    @Expose
    public Integer status;
    @SerializedName("token")
    @Expose
    public String token;
    @SerializedName("message")
    @Expose
    public String message;

    public PostResponse() {
    }

    public PostResponse(Integer status, String token, String message) {
        super();
        this.status = status;
        this.token = token;
        this.message = message;
    }

}