/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.ionicframework.kuwaitlocalbusiness270518;

import android.os.Bundle;

import org.apache.cordova.CordovaActivity;


public class MainActivity extends CordovaActivity
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);

        // Set by <content src="index.html" /> in config.xml

        // Add code to print out the key hash
//    PackageInfo packageInfo;
//        //Context context;
////        PackageManager PackageManager;
//        //private final Context context;
//
//        String key = null;
//        try {
//            PackageInfo info = getPackageManager().getPackageInfo(
//                    "com.ionicframework.kuwaitlocalbusiness270518",
//                    PackageManager.GET_SIGNATURES);
//            for (Signature signature : info.signatures) {
//                MessageDigest md = MessageDigest.getInstance("SHA");
//                md.update(signature.toByteArray());
//                Log.d("KeyHash:", Base64.encodeToString(md.digest(), Base64.DEFAULT));
//                AlertDialog alertDialog = new AlertDialog.Builder(MainActivity.this).create();
//                alertDialog.setTitle("Alert");
//                alertDialog.setMessage(Base64.encodeToString(md.digest(), Base64.DEFAULT));
//                alertDialog.setButton(AlertDialog.BUTTON_NEUTRAL, "OK",
//                        new DialogInterface.OnClickListener() {
//                            public void onClick(DialogInterface dialog, int which) {
//                                dialog.dismiss();
//                            }
//                        });
//                alertDialog.show();
//            }
//        } catch (NameNotFoundException e1) {
//            Log.e("Name not found", e1.toString());
//        }
//        catch (NoSuchAlgorithmException e) {
//            Log.e("No such an algorithm", e.toString());
//        } catch (Exception e) {
//            Log.e("Exception", e.toString());
//        }
        //modify line below
       // super.setIntegerProperty("loadUrlTimeoutValue", 70000);
        //end modify line
        loadUrl(launchUrl);

    }
}
