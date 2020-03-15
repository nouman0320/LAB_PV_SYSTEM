package com.programrabbit.labpvapp;

import android.app.ActivityManager;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.util.Log;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import java.util.List;

import androidx.core.app.NotificationCompat;
import androidx.core.app.TaskStackBuilder;


public class MyFirebaseMessagingService extends FirebaseMessagingService {
    public MyFirebaseMessagingService() {

    }

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        // ...

        // TODO(developer): Handle FCM messages here.
        // Not getting messages here? See why this may be: https://goo.gl/39bRNJ
        Log.d("MessageService", "From: " + remoteMessage.getFrom());

        // Check if message contains a data payload.
        if (remoteMessage.getData().size() > 0) {
            Log.d("MessageService", "Message data payload: " + remoteMessage.getData());

            if (/* Check if data needs to be processed by long running job */ true) {
                // For long-running tasks (10 seconds or more) use Firebase Job Dispatcher.
                //scheduleJob();
            } else {
                // Handle message within 10 seconds
                //handleNow();
            }

        }

        // Check if message contains a notification payload.
        if (remoteMessage.getNotification() != null) {

            //Define sound URI
            Uri soundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_ALARM);


            Context mContext = getApplicationContext();
            NotificationManager  mNotificationManager = (NotificationManager)
                    this.getSystemService(Context.NOTIFICATION_SERVICE);



            ActivityManager activityManager = (ActivityManager) getSystemService(Context.ACTIVITY_SERVICE);
            List<ActivityManager.RunningTaskInfo> services = activityManager
                    .getRunningTasks(Integer.MAX_VALUE);
            boolean isActivityFound = false;

            if (services.get(0).topActivity.getPackageName().toString()
                    .equalsIgnoreCase(getPackageName().toString())) {
                isActivityFound = true;
            }
            Intent openIntent = null;
            if (isActivityFound) {
                openIntent = new Intent();
            } else {
                openIntent = new Intent(this, MainActivity.class);
                //openIntent.putExtra("message", msg);
            }
            PendingIntent contentIntent = PendingIntent.getActivity(this, 0,
                    openIntent, PendingIntent.FLAG_ONE_SHOT);


            if (true) {
                NotificationCompat.Builder mBuilder =
                        new NotificationCompat.Builder(this)
                                .setDefaults(Notification.DEFAULT_ALL)
                                .setVibrate(new long[]{100, 250, 100, 250, 100, 250})
                                .setAutoCancel(true)
                                .setColor(getResources().getColor(R.color.colorPrimary))
                                .setContentTitle(remoteMessage.getNotification().getTitle())
                                .setStyle(new NotificationCompat.BigTextStyle()
                                        .bigText(remoteMessage.getNotification().getBody()))
                                .setPriority(Notification.PRIORITY_MAX)
                                .setContentText(remoteMessage.getNotification().getBody());

                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                    mBuilder.setSmallIcon(R.drawable.ic_launcher_background);
                } else {
                    mBuilder.setSmallIcon(R.drawable.ic_launcher_background);
                }

                mBuilder.setContentIntent(contentIntent);


                int notificationNumber = 0;

                mNotificationManager.notify(notificationNumber, mBuilder.build());

            }
        }

        // Also if you intend on generating your own notifications as a result of a received FCM
        // message, here is where that should be initiated. See sendNotification method below.
    }



    /**
     * Called if InstanceID token is updated. This may occur if the security of
     * the previous token had been compromised. Note that this is called when the InstanceID token
     * is initially generated so this is where you would retrieve the token.
     */
    @Override
    public void onNewToken(String token) {
        Log.d("MessageService", "Refreshed token: " + token);

        // If you want to send messages to this application instance or
        // manage this apps subscriptions on the server side, send the
        // Instance ID token to your app server.
        //sendRegistrationToServer(token);
    }
}
