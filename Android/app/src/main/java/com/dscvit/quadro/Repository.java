package com.dscvit.quadro;


import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

import com.dscvit.quadro.api.ApiClient;
import com.dscvit.quadro.api.ApiInterface;
import com.dscvit.quadro.models.LoginUser;
import com.dscvit.quadro.models.PostResponse;
import com.dscvit.quadro.models.User;
import com.dscvit.quadro.ui.activities.HomeActivity;
import com.dscvit.quadro.ui.activities.LoginActivity;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import static com.dscvit.quadro.Constants.RESPONSE_OK;

public class Repository {

    private ApiInterface apiInterface;
    Context context;

    public Repository(Context mContext) {
        apiInterface = ApiClient.getClient().create(ApiInterface.class);
        context = mContext;
    }

    public void registerUser(User user){
        Call<PostResponse> call = apiInterface.registerUser(user);
        call.enqueue(new Callback<PostResponse>() {
            @Override
            public void onResponse(Call<PostResponse> call, Response<PostResponse> response) {
                Toast.makeText(context, response.body().message, Toast.LENGTH_LONG).show();
                if(response.body().status==RESPONSE_OK){
                    context.startActivity(new Intent(context,LoginActivity.class));
                }
            }

            @Override
            public void onFailure(Call<PostResponse> call, Throwable t) {
                Log.d("asa", "error: : "+t.getMessage());
            }
        });
    }


    public void loginUser(LoginUser user){
        Call<PostResponse> call = apiInterface.loginUser(user);
        call.enqueue(new Callback<PostResponse>() {
            @Override
            public void onResponse(Call<PostResponse> call, Response<PostResponse> response) {
                Toast.makeText(context, response.body().message, Toast.LENGTH_LONG).show();
                if(response.body().status==RESPONSE_OK){
                    AppPreferences.getInstance(context).storeAuthToken(response.body().token);
                    context.startActivity(new Intent(context, HomeActivity.class));
                }
            }

            @Override
            public void onFailure(Call<PostResponse> call, Throwable t) {
                Log.d("asa", "error: : "+t.getMessage());
            }
        });
    }

}
