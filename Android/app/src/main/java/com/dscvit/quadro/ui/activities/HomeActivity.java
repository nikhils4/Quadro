package com.dscvit.quadro.ui.activities;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;

import com.dscvit.quadro.R;
import com.dscvit.quadro.adapters.MainDomainAdapter;

import java.util.ArrayList;
import java.util.List;

public class HomeActivity extends AppCompatActivity {

    RecyclerView recycler_view;
    List<String> domainArray;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
        domainArray = new ArrayList<>();
        initViews();
        setDemoValuesForRecyclerView();
        setuprecyclerView();
    }

    private void setDemoValuesForRecyclerView() {
        domainArray.add("Android");
        domainArray.add("Web");
        domainArray.add("ML");
        domainArray.add("Kernel");
        domainArray.add("UI");
        domainArray.add("iOS");

    }

    private void setuprecyclerView() {
        recycler_view.setHasFixedSize(true);
        recycler_view.setLayoutManager(new LinearLayoutManager(this));
        recycler_view.setAdapter(new MainDomainAdapter(this,domainArray));
    }

    private void initViews() {
        recycler_view = findViewById(R.id.recycler_view);
    }


}
