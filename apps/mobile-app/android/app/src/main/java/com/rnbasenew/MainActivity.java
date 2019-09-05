// package com.rnbasenew;

// import android.content.Intent;
// import android.graphics.drawable.Drawable;
// import android.os.Bundle;
// import android.widget.LinearLayout;

// import androidx.core.content.ContextCompat;
// import com.facebook.react.ReactActivity;

// public class MainActivity extends ReactActivity {

//     /**
//      * Returns the name of the main component registered from JavaScript.
//      * This is used to schedule rendering of the component.
//      */

//     @Override
//     public void onActivityResult(int requestCode, int resultCode, Intent data) {
//         super.onActivityResult(requestCode, resultCode, data);
// //        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
//     }

//     @Override
//     protected void onCreate(Bundle savedInstanceState) {
//         super.onCreate(savedInstanceState);
//         setContentView(this.createSplashLayout());
//     }

//     public LinearLayout createSplashLayout() {
//         LinearLayout splash = new LinearLayout(this);
//         Drawable launch_screen_bitmap = ContextCompat.getDrawable(getApplicationContext(), R.drawable.splash_centered);
//         splash.setBackground(launch_screen_bitmap);

//         return splash;
//     }
// }
package com.rnbasenew;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "rnBaseNew";
    }
}

