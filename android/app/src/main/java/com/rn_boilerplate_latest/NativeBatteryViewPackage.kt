package com.rn_boilerplate_latest

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.ModuleSpec
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfoProvider

/**
 * Registers the Fabric battery view. The TurboModule lives in DeviceInfoPackage.
 */
class NativeBatteryViewPackage : BaseReactPackage() {
    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? =
        null

    override fun getReactModuleInfoProvider(): ReactModuleInfoProvider =
        ReactModuleInfoProvider { emptyMap() }

    override fun getViewManagers(reactContext: ReactApplicationContext): List<ModuleSpec> =
        listOf(ModuleSpec.viewManagerSpec { NativeBatteryViewManager() })
}
