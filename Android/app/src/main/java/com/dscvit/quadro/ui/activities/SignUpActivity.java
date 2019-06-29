package com.dscvit.quadro.ui.activities;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.dscvit.quadro.R;
import com.dscvit.quadro.Repository;
import com.dscvit.quadro.models.User;
import com.wdullaer.materialdatetimepicker.date.DatePickerDialog;

import java.util.Calendar;

public class SignUpActivity extends AppCompatActivity implements DatePickerDialog.OnDateSetListener, View.OnClickListener {

    EditText email_et,name_et,pass_et,confirm_pass_et,dob_et;
    TextView sign_up_tv;
    Repository repository;
    RadioGroup radioGroup;
    RadioButton radioButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);
        initViews();
        sign_up_tv.setOnClickListener(this);
        repository = new Repository(this);
    }

    private void initViews() {
        email_et = findViewById(R.id.email_et);
        name_et = findViewById(R.id.name_et);
        pass_et  = findViewById(R.id.pass_et);
        confirm_pass_et = findViewById(R.id.confirm_pass_et);
        dob_et = findViewById(R.id.dob_et);
        radioGroup = findViewById(R.id.radio);
        sign_up_tv = findViewById(R.id.sign_up_tv);

    }

    public void startLoginAct(View view) {
        startActivity(new Intent(this, LoginActivity.class));
    }

    public void showCalender(View view) {
        Calendar now = Calendar.getInstance();
        DatePickerDialog dpd = DatePickerDialog.newInstance(
                SignUpActivity.this,
                now.get(Calendar.YEAR), // Initial year selection
                now.get(Calendar.MONTH), // Initial month selection
                now.get(Calendar.DAY_OF_MONTH) // Inital day selection
        );
        dpd.setVersion(DatePickerDialog.Version.VERSION_2);
        dpd.show(getFragmentManager(), "Datepickerdialog");
    }

    @Override
    public void onDateSet(com.wdullaer.materialdatetimepicker.date.DatePickerDialog view, int year, int monthOfYear, int dayOfMonth) {
        Toast.makeText(this, String.valueOf(year), Toast.LENGTH_SHORT).show();
        dob_et.setText(String.valueOf(dayOfMonth) + "-" + String.valueOf(monthOfYear) + "-" +String.valueOf(year));
    }

    @Override
    public void onClick(View v) {
        String name = name_et.getText().toString();
        String email = email_et.getText().toString();
        String dob = dob_et.getText().toString();
        String gender = ((RadioButton) findViewById(radioGroup.getCheckedRadioButtonId())).getText().toString();
        String password = pass_et.getText().toString();
        //TODO : Add the experiance and Domain from user.
        User user = new User(name,email,dob,gender,password,3,"Android");
         repository.registerUser(user);
    }
}
