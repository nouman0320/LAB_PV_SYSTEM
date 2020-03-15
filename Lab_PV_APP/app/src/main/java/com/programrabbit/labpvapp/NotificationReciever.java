package com.programrabbit.labpvapp;

import android.content.Context;
import android.content.Intent;
import android.media.Ringtone;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Vibrator;

import androidx.legacy.content.WakefulBroadcastReceiver;

public class NotificationReciever extends WakefulBroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        playNotificationSound(context);
    }

    public void playNotificationSound(Context context) {
        try {
            Vibrator vib;
            Uri notification = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
            Ringtone r = RingtoneManager.getRingtone(context, notification);
            vib = (Vibrator) context.getSystemService(Context.VIBRATOR_SERVICE);
            vib.vibrate(500);
            r.play();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}