#import "NativeDeviceInfo.h"
#import <UIKit/UIKit.h>

@implementation NativeDeviceInfo

RCT_EXPORT_MODULE(NativeAppDeviceInfo)

- (NSString *)getDeviceModel {
    return [[UIDevice currentDevice] model];
}

- (NSNumber *)isEmulator {
#if TARGET_IPHONE_SIMULATOR
    return @YES;
#else
    return @NO;
#endif
}

- (void)getBatteryLevel:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject {
    [UIDevice currentDevice].batteryMonitoringEnabled = YES;
    float batteryLevel = [UIDevice currentDevice].batteryLevel;
    if (batteryLevel < 0.0) {
        resolve(@(-1));
    } else {
        resolve(@((int)(batteryLevel * 100)));
    }
}

- (NSString *)getAppVersion {
    NSDictionary *infoDict = [[NSBundle mainBundle] infoDictionary];
    NSString *version = infoDict[@"CFBundleShortVersionString"] ?: @"1.0.0";
    return version;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params {
    return std::make_shared<facebook::react::NativeAppDeviceInfoSpecJSI>(params);
}

@end
