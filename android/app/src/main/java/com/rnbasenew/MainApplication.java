package com.rnbasenew;

import androidx.annotation.Nullable;

import com.facebook.react.PackageList;
import com.microsoft.codepush.react.CodePush;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;

import java.util.ArrayList;
import java.util.List;


public class MainApplication extends NavigationApplication {

  @Override
  protected ReactNativeHost createReactNativeHost() {
    return new NavigationReactNativeHost(this) {
      @Override
      protected String getJSBundleFile(){
        return CodePush.getJSBundleFile();
      }

      @Override
      protected String getJSMainModuleName() {
        return "index";
      }
      @Override
      public boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
      }
    };
  }

  @Override
  public boolean isDebug() {
    return false;
  }

  @Nullable
  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    @SuppressWarnings("UnnecessaryLocalVariable")
    List<ReactPackage> initializedPackages = new PackageList(this).getPackages();
    List<ReactPackage> packages = new ArrayList<>();
    for (ReactPackage p : initializedPackages) {
      if (!(p instanceof CodePush)) {
        packages.add(p);
      }
    }
    packages.add(new CodePush(getResources().getString(R.string.CODE_PUSH_ANDROID_KEY), getApplicationContext(), isDebug()));


    // Packages that cannot be autolinked yet can be added manually here, for example:
    // packages.add(new MyReactNativePackage());
    return packages;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
