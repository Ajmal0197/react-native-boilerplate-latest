#import "NativeBatteryView.h"

#import <React/RCTComponentViewProtocol.h>
#import <ReactAppDependencyProvider/RCTAppDependencyProvider.h>

/// Codegen registers library Fabric components only.
/// This provider adds the app's NativeBatteryView to that map.
@interface BoilerplateDependencyProvider : RCTAppDependencyProvider
@end

@implementation BoilerplateDependencyProvider

- (NSDictionary<NSString *, Class<RCTComponentViewProtocol>> *)thirdPartyFabricComponents
{
  NSMutableDictionary<NSString *, Class<RCTComponentViewProtocol>> *components =
      [[super thirdPartyFabricComponents] mutableCopy];
  components[@"NativeBatteryView"] = [NativeBatteryView class];
  return components;
}

@end
