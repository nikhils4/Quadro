package com.dscvit.quadro.api;

import com.dscvit.quadro.models.LoginUser;
import com.dscvit.quadro.models.PostResponse;
import com.dscvit.quadro.models.User;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.POST;

public interface ApiInterface {

    @POST("/auth/signup")
    Call<PostResponse> registerUser(@Body User user);

    @POST("/auth/login")
    Call<PostResponse> loginUser(@Body LoginUser user);
}