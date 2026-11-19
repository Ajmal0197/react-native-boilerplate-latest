package com.rn_boilerplate_latest

import android.content.Context
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.graphics.RectF
import android.view.View

/**
 * Fabric view for the NativeBatteryView spec.
 *
 * Codegen owns the shadow node. This class only paints the props the
 * ViewManager receives: level (0–1), isCharging, and fillColor.
 */
class NativeBatteryView(context: Context) : View(context) {
    var level: Double = 1.0
        set(value) {
            field = value
            invalidate()
        }

    var isCharging: Boolean = false
        set(value) {
            field = value
            invalidate()
        }

    var fillColor: Int = DEFAULT_FILL
        set(value) {
            field = value
            invalidate()
        }

    private val shapePaint = Paint(Paint.ANTI_ALIAS_FLAG)
    private val labelPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = Color.WHITE
        textAlign = Paint.Align.CENTER
    }
    private val body = RectF()
    private val fill = RectF()
    private val cap = RectF()

    init {
        setWillNotDraw(false)
    }

    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)
        val widthPx = width.toFloat()
        val heightPx = height.toFloat()
        if (widthPx <= 0f || heightPx <= 0f) {
            return
        }

        val density = resources.displayMetrics.density
        val stroke = 2f * density
        val capWidth = 3f * density
        val gap = 2f * density
        val radius = 3f * density
        val bodyRight = widthPx - capWidth - gap

        body.set(stroke / 2f, stroke / 2f, bodyRight - stroke / 2f, heightPx - stroke / 2f)
        shapePaint.style = Paint.Style.STROKE
        shapePaint.strokeWidth = stroke
        shapePaint.color = BORDER
        canvas.drawRoundRect(body, radius, radius, shapePaint)

        val inset = stroke + density
        val clamped = level.coerceIn(0.0, 1.0).toFloat()
        fill.set(body.left + inset, body.top + inset, body.right - inset, body.bottom - inset)
        fill.right = fill.left + fill.width() * clamped
        shapePaint.style = Paint.Style.FILL
        shapePaint.color = fillColor
        if (fill.width() > 0f) {
            canvas.drawRoundRect(fill, radius / 2f, radius / 2f, shapePaint)
        }

        cap.set(bodyRight, heightPx * 0.3f, widthPx, heightPx * 0.7f)
        shapePaint.color = BORDER
        canvas.drawRoundRect(cap, density, density, shapePaint)

        if (isCharging) {
            labelPaint.textSize = heightPx * 0.55f
            val textY = heightPx / 2f - (labelPaint.descent() + labelPaint.ascent()) / 2f
            canvas.drawText("⚡", body.centerX(), textY, labelPaint)
        }
    }

    companion object {
        const val DEFAULT_FILL = 0xFF34C759.toInt()
        private const val BORDER = 0xFF8E8E93.toInt()

        fun parseFillColor(value: String?): Int {
            if (value.isNullOrBlank()) {
                return DEFAULT_FILL
            }
            return try {
                Color.parseColor(value)
            } catch (_: IllegalArgumentException) {
                DEFAULT_FILL
            }
        }
    }
}
