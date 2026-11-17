package com.rn_boilerplate_latest

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

/**
 * Package registration for TurboModule
 *
 * Registers the TurboModule with the React Native New Architecture runtime.
 */
class DeviceInfoPackage : BaseReactPackage() {

    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
        return if (name == DeviceInfoModule.NAME) {
            DeviceInfoModule(reactContext)
        } else {
            null
        }
    }

    override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
        return ReactModuleInfoProvider {
            val moduleInfos = mutableMapOf<String, ReactModuleInfo>()
            moduleInfos[DeviceInfoModule.NAME] = ReactModuleInfo(
                DeviceInfoModule.NAME,
                DeviceInfoModule.NAME,
                false, // canOverrideExistingModule
                false, // needsEagerInit
                false, // isCxxModule
                true   // isTurboModule (MUST be true for New Architecture)
            )
            moduleInfos
        }
    }
}
