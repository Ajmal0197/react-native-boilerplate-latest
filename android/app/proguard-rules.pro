# ==============================================================================
# 1. GENERAL OPTIMIZATION, OBFUSCATION & R8 SETTINGS
# ==============================================================================
-dontusemixedcaseclassnames
-dontskipnonpubliclibraryclasses
-verbose

# Preserve line numbers and file names for readable crash stack traces
-keepattributes SourceFile,LineNumberTable
-renamesourcefileattribute SourceFile

# Preserve runtime annotations, generic signatures, inner classes & exceptions
-keepattributes *Annotation*,Signature,InnerClasses,EnclosingMethod,Exceptions

# Suppress harmless warnings from dependencies
-dontwarn okhttp3.**
-dontwarn okio.**
-dontwarn javax.annotation.**
-dontwarn org.conscrypt.**
-dontwarn kotlin.**
-dontwarn kotlinx.coroutines.**
-dontwarn com.facebook.react.**

# Preserve all native (JNI) method bindings across all classes
-keepclasseswithmembernames class * {
    native <methods>;
}

# ==============================================================================
# 2. REACT NATIVE CORE & NEW ARCHITECTURE (FABRIC / TURBOMODULES / JSI)
# ==============================================================================
-keep class com.facebook.react.** { *; }
-keep interface com.facebook.react.** { *; }
-keep class com.facebook.react.bridge.** { *; }
-keep class com.facebook.react.uimanager.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }
-keep class com.facebook.react.fabric.** { *; }

-keepclassmembers class * {
    @com.facebook.react.uimanager.annotations.ReactProp <methods>;
    @com.facebook.react.uimanager.annotations.ReactPropGroup <methods>;
    @com.facebook.react.bridge.ReactMethod <methods>;
    @com.facebook.react.bridge.ReactMethodSync <methods>;
    @com.facebook.proguard.annotations.DoNotStrip <methods>;
    @com.facebook.proguard.annotations.KeepGettersAndSetters <methods>;
}

-keep @com.facebook.proguard.annotations.DoNotStrip class *
-keepclassmembers class * {
    @com.facebook.proguard.annotations.DoNotStrip *;
}

-keep class * extends com.facebook.react.bridge.JavaScriptModule { *; }
-keep class * extends com.facebook.react.bridge.NativeModule { *; }

# Yoga, FBJNI, Soloader
-keep class com.facebook.yoga.** { *; }
-keep class com.facebook.jni.** { *; }
-keep class com.facebook.soloader.** { *; }

# Hermes Engine
-keep class com.facebook.hermes.unicode.** { *; }
-keep class com.facebook.hermes.instrumentation.** { *; }
-keep class com.facebook.hermes.reactexecutor.** { *; }

# ==============================================================================
# 3. APP NATIVE MODULES & CODE
# ==============================================================================
-keep class com.rn_boilerplate_latest.** { *; }
-keepclassmembers class com.rn_boilerplate_latest.** { *; }

# ==============================================================================
# 4. INSTALLED THIRD-PARTY LIBRARIES (CRASH PREVENTION)
# ==============================================================================

# BuildConfig & react-native-config
-keep class com.rn_boilerplate_latest.BuildConfig { *; }
-keepresources string/build_config_package
-keep class com.lugg.RNCConfig.** { *; }

# react-native-mmkv (Tencent MMKV + Nitro MMKV)
-keep class com.tencent.mmkv.** { *; }
-keep class com.reactnativemmkv.** { *; }
-keep class com.margelo.nitro.mmkv.** { *; }
-keepclassmembers class com.tencent.mmkv.** { *; }
-keepclassmembers class com.margelo.nitro.mmkv.** { *; }

# react-native-nitro-modules
-keep class com.margelo.nitro.** { *; }
-keepclassmembers class com.margelo.nitro.** { *; }

# react-native-reanimated & react-native-worklets
-keep class com.swmansion.reanimated.** { *; }
-keepclassmembers class com.swmansion.reanimated.** { *; }
-keep class com.swmansion.worklets.** { *; }
-keepclassmembers class com.swmansion.worklets.** { *; }

# react-native-screens
-keep class com.swmansion.rnscreens.** { *; }
-keepclassmembers class com.swmansion.rnscreens.** { *; }

# react-native-safe-area-context
-keep class com.th3rdwave.safeareacontext.** { *; }
-keepclassmembers class com.th3rdwave.safeareacontext.** { *; }

# react-native-svg
-keep class com.horcrux.svg.** { *; }
-keepclassmembers class com.horcrux.svg.** { *; }

# react-native-keyboard-controller
-keep class com.reactnativekeyboardcontroller.** { *; }
-keepclassmembers class com.reactnativekeyboardcontroller.** { *; }

# @notifee/react-native
-keep class app.notifee.core.** { *; }
-keepclassmembers class app.notifee.core.** { *; }
-keep class io.invertase.notifee.** { *; }
-keepclassmembers class io.invertase.notifee.** { *; }

# react-native-unistyles
-keep class com.unistyles.** { *; }
-keepclassmembers class com.unistyles.** { *; }

# react-native-localize
-keep class com.zoontek.rnlocalize.** { *; }
-keepclassmembers class com.zoontek.rnlocalize.** { *; }

# react-native-restart
-keep class com.reactnativerestart.** { *; }
-keepclassmembers class com.reactnativerestart.** { *; }

# OkHttp3 & Okio
-keepclassmembers class okhttp3.internal.publicsuffix.PublicSuffixDatabase {
    native <methods>;
}
-keep class okhttp3.** { *; }
-keep interface okhttp3.** { *; }
-keep class okio.** { *; }
-keep interface okio.** { *; }

# ==============================================================================
# 5. FIREBASE & GOOGLE PLAY SERVICES (FORWARD-COMPATIBLE)
# ==============================================================================

# Google Play Services & Tasks
-dontwarn com.google.android.gms.**
-keep class com.google.android.gms.common.** { *; }
-keep class com.google.android.gms.tasks.** { *; }

# React Native Firebase Core (@react-native-firebase/app)
-dontwarn io.invertase.firebase.**
-keep class io.invertase.firebase.** { *; }
-keep class com.google.firebase.** { *; }
-dontwarn com.google.firebase.**

# Firebase Cloud Messaging (FCM / Push Notifications)
-keep class com.google.firebase.messaging.** { *; }
-keep public class * extends com.google.firebase.messaging.FirebaseMessagingService

# Firebase Crashlytics
-keep class com.google.firebase.crashlytics.** { *; }
-dontwarn com.google.firebase.crashlytics.**

# Firebase Analytics
-keep class com.google.firebase.analytics.** { *; }

# Firebase Auth
-keep class com.google.firebase.auth.** { *; }

# Firebase Firestore & Database
-keep class com.google.firebase.firestore.** { *; }
-keep class com.google.firebase.database.** { *; }
