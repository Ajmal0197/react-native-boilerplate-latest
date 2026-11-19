package com.rn_boilerplate_latest

import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.viewmanagers.NativeBatteryViewManagerDelegate
import com.facebook.react.viewmanagers.NativeBatteryViewManagerInterface

/**
 * Fabric ViewManager for NativeBatteryView.
 *
 * The delegate class is generated from specs/NativeBatteryViewNativeComponent.ts.
 * Prop updates arrive through that delegate, not through @ReactProp.
 */
@ReactModule(name = NativeBatteryViewManager.NAME)
class NativeBatteryViewManager :
    SimpleViewManager<NativeBatteryView>(),
    NativeBatteryViewManagerInterface<NativeBatteryView> {

    private val delegate = NativeBatteryViewManagerDelegate(this)

    override fun getDelegate() = delegate

    override fun getName(): String = NAME

    override fun createViewInstance(reactContext: ThemedReactContext): NativeBatteryView =
        NativeBatteryView(reactContext)

    override fun setLevel(view: NativeBatteryView, value: Double) {
        view.level = value
    }

    override fun setIsCharging(view: NativeBatteryView, value: Boolean) {
        view.isCharging = value
    }

    override fun setFillColor(view: NativeBatteryView, value: String?) {
        view.fillColor = NativeBatteryView.parseFillColor(value)
    }

    companion object {
        const val NAME = "NativeBatteryView"
    }
}
