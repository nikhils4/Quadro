package com.dscvit.quadro.ui.activities;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

import com.dscvit.quadro.R;
import com.dscvit.quadro.Repository;
import com.dscvit.quadro.models.LoginUser;
import com.dscvit.quadro.models.User;

import org.w3c.dom.Text;

public class LoginActivity extends AppCompatActivity implements View.OnClickListener {

    EditText email_et, pass_et;
    TextView sign_in_tv;
    Repository repository;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        initViews();
        sign_in_tv.setOnClickListener(this);
        repository = new Repository(this);

    }

    private void initViews() {
        email_et = findViewById(R.id.email_et);
        pass_et  = findViewById(R.id.pass_et);
        sign_in_tv = findViewById(R.id.sign_in_tv);

    }

    public void startSignupAct(View view) {
        startActivity(new Intent(this, SignUpActivity.class));
    }

    @Override
    public void onClick(View v) {
        String email = email_et.getText().toString();
        String password = pass_et.getText().toString();
        LoginUser user = new LoginUser(email,password);
        repository.loginUser(user);
    }
}
