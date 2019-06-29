package com.dscvit.quadro;

import android.content.Context;
import android.content.SharedPreferences;

import static com.dscvit.quadro.Constants.AUTH_TOKEN;
import static com.dscvit.quadro.Constants.SHARED_PREF;

public class AppPreferences {

    private static AppPreferences appPreferences;
    private static Context context;
    SharedPreferences sharedPreferences ;

    private AppPreferences(Context context) {
        sharedPreferences = context.getSharedPreferences(SHARED_PREF,Context.MODE_PRIVATE);
    }

    public static AppPreferences getInstance(Context mContext) {
        if (appPreferences == null) {
            appPreferences = new AppPreferences(mContext);
        }
        return appPreferences;
    }

    void storeAuthToken(String token){
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString(AUTH_TOKEN,token);
        editor.apply();
    }

}
