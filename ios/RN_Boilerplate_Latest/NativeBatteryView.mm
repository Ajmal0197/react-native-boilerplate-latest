#import "NativeBatteryView.h"

#import <react/renderer/components/AppSpecs/ComponentDescriptors.h>
#import <react/renderer/components/AppSpecs/EventEmitters.h>
#import <react/renderer/components/AppSpecs/Props.h>
#import <react/renderer/components/AppSpecs/RCTComponentViewHelpers.h>

using namespace facebook::react;

@interface NativeBatteryView () <RCTNativeBatteryViewViewProtocol>
@end

@implementation NativeBatteryView {
  UIView *_body;
  UIView *_fill;
  UIView *_cap;
  UILabel *_bolt;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<NativeBatteryViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const NativeBatteryViewProps>();
    _props = defaultProps;

    _body = [UIView new];
    _body.layer.borderWidth = 2;
    _body.layer.cornerRadius = 3;
    _body.clipsToBounds = YES;

    _fill = [UIView new];
    _cap = [UIView new];
    _cap.layer.cornerRadius = 1;

    _bolt = [UILabel new];
    _bolt.text = @"⚡";
    _bolt.textAlignment = NSTextAlignmentCenter;
    _bolt.hidden = YES;

    [self addSubview:_body];
    [_body addSubview:_fill];
    [self addSubview:_cap];
    [_body addSubview:_bolt];
  }
  return self;
}

- (void)updateProps:(const Props::Shared &)props oldProps:(const Props::Shared &)oldProps
{
  [super updateProps:props oldProps:oldProps];

  const auto &newProps = *std::static_pointer_cast<const NativeBatteryViewProps>(props);
  UIColor *fill = [self colorFromString:newProps.fillColor] ?: [UIColor systemGreenColor];
  _fill.backgroundColor = fill;
  _body.layer.borderColor = [UIColor secondaryLabelColor].CGColor;
  _cap.backgroundColor = [UIColor secondaryLabelColor];
  _bolt.hidden = !newProps.isCharging;
  [self setNeedsLayout];
}

- (void)layoutSubviews
{
  [super layoutSubviews];

  const auto &props = *std::static_pointer_cast<const NativeBatteryViewProps>(_props);
  CGFloat capWidth = 3;
  CGFloat gap = 2;
  CGFloat bodyWidth = MAX(0, CGRectGetWidth(self.bounds) - capWidth - gap);
  CGFloat bodyHeight = CGRectGetHeight(self.bounds);
  _body.frame = CGRectMake(0, 0, bodyWidth, bodyHeight);

  CGFloat inset = 3;
  CGFloat innerWidth = MAX(0, bodyWidth - inset * 2);
  CGFloat innerHeight = MAX(0, bodyHeight - inset * 2);
  double level = MIN(1.0, MAX(0.0, props.level));
  _fill.frame = CGRectMake(inset, inset, innerWidth * level, innerHeight);
  _cap.frame = CGRectMake(bodyWidth + gap, bodyHeight * 0.3, capWidth, bodyHeight * 0.4);
  _bolt.frame = _body.bounds;
}

- (UIColor *)colorFromString:(const std::string &)value
{
  if (value.size() != 7 || value[0] != '#') {
    return nil;
  }
  unsigned int rgb = 0;
  NSString *hex = [NSString stringWithUTF8String:value.c_str()];
  NSScanner *scanner = [NSScanner scannerWithString:[hex substringFromIndex:1]];
  if (![scanner scanHexInt:&rgb]) {
    return nil;
  }
  return [UIColor colorWithRed:((rgb >> 16) & 0xFF) / 255.0
                         green:((rgb >> 8) & 0xFF) / 255.0
                          blue:(rgb & 0xFF) / 255.0
                         alpha:1];
}

@end
