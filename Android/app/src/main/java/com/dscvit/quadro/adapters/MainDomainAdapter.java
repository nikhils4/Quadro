package com.dscvit.quadro.adapters;

import android.content.Context;
import android.content.Intent;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.dscvit.quadro.R;

import java.util.List;

public class MainDomainAdapter extends RecyclerView.Adapter<MainDomainAdapter.MainDomainViewHolder> {

    private List<String> dataList;
    private Context context;

    public MainDomainAdapter(Context context, List<String> dataList) {
        this.context = context;
        this.dataList = dataList;
    }

    class MainDomainViewHolder extends RecyclerView.ViewHolder {

        public final View mView;
        TextView title_tv;
        LinearLayout full_card_ll;

        MainDomainViewHolder(View itemView) {
            super(itemView);
            mView = itemView;
            title_tv = mView.findViewById(R.id.title_tv);

        }
    }

    @Override
    public MainDomainViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        LayoutInflater layoutInflater = LayoutInflater.from(parent.getContext());
        View view = layoutInflater.inflate(R.layout.layout_main_domain, parent, false);
        return new MainDomainViewHolder(view);
    }

    @Override
    public void onBindViewHolder(MainDomainViewHolder holder, final int position) {
        holder.title_tv.setText(dataList.get(position));
    }

    @Override
    public int getItemCount() {
        return dataList.size();
    }
}
