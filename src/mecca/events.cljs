(ns ^:figwheel-hooks mecca.events
  (:require
   [re-frame.core :refer [reg-event-db reg-event-fx dispatch subscribe]]
   [ajax.core :as ajax]
   [ajax.protocols :as protocol]
   [day8.re-frame.undo :as undo :refer [undoable]]
   [mecca.mario :as mario :refer [mario]]
   [mecca.music :as music :refer [audiocontext]]
   [goog.events :refer [listen unlisten]])
  (:import [goog.events EventType]))

(reg-event-db
 :initialize-db
 (fn [_ _]
   {:focused-note-pos [nil nil]
    :play-start 0
    :jumping? false
    :current-position 0
    :next-note-time 0.0
    :notes-in-queue []
    :editor-beat-start 1
    :instrument 1
    :array-buffer nil
    :key "C"
    :time 0
    :time-signature 4
    :tempo 120
    :instruments []
    :lead []
    :bassline []
    :drums []
    :mario-x 54
    :mario-y 59
    :mario-jump 0
    :mario-run 1}))

(reg-event-db
 :add-note
 (undoable "add note")
 (fn [db [_ instrument time pitch]]
   (if (= (.-state @audiocontext) "suspended")
     (.resume @audiocontext))
   (music/play-sample instrument pitch)
   (update db :instruments
           conj 
           {:time time
            :instrument instrument
            :pitch (- 77 pitch)})))

(reg-event-db
 :next-note
 (fn [db [_ _]]
   (update (update db :next-note-time #(+ (/ 60 @(subscribe [:tempo])) %))
           :current-position #(+ 0.5 %))))

(reg-event-db
 :schedule-note
 (fn [db [_ beat time]]
   (update db :notes-in-queue conj {:note beat :time time})))

(reg-event-db
 :remove-note
 (undoable "remove note")
 (fn [db [_ instrument time pitch]]
   (update db (keyword instrument)
              (fn [notes]
                (remove #(and (= time (:time %))
                              (= (- 77 pitch) (:pitch %)))
                        notes)))))

(reg-event-db
 :set-time-signature
 (fn [db [_ beats-per-measure]]
   (update db :time-signature beats-per-measure)))

(reg-event-db                 ;; usage:  (dispatch [:timer a-js-Date])
 :timer                         ;; every second an event of this kind will be dispatched
 (fn [db [_ new-time]]          ;; note how the 2nd parameter is destructured to obtain the data value
   (assoc db :time new-time)))

(reg-event-db
 :play-on
 (fn [db [_ _]]
   (music/play-song!)
   (assoc db :play-start (.-currentTime @audiocontext))))

(reg-event-db
 :update-focus-note
 (fn [db [_ pos]]
   (assoc db :focused-note-pos pos)))

(reg-event-db
 :select-instrument
 (fn [db [_ instrument]]
   (assoc db :instrument instrument)))

(reg-event-db
 :play-off
 (fn [db [_ _]]
   (dispatch [:reset-editor])
   (assoc db :play-start 0)))

(reg-event-db
 :advance-position
 (fn [db [_ _]]
   (if (< 1 @(subscribe [:play-start]))
     (dispatch [:advance-editor])
     (dispatch [:reset-editor]))
   (update db :current-position #(+ 0.5 %))))

(reg-event-db
 :advance-editor
 (fn [db [_ _]]
   (update db :editor-beat-start #(+ 0.5 %))))

(reg-event-db
 :reset-editor
 (fn [db [_ _]]
   (assoc db :editor-beat-start 1)))

(reg-event-db
 :retract-editor
 (fn [db [_ _]]
   (update db :editor-beat-start #(- % 0.5))))

(reg-event-db
 :reset-position
 (fn [db [_ _]]
   (assoc db :current-position 0)))

(reg-event-db
 :set-tempo
 (fn [db [_ tempo]]
   (assoc db :tempo tempo)))

(reg-event-db
 :inc-tempo
 (fn [db [_ tempo]]
   (update db :tempo #(+ 8 %))))

(reg-event-db
 :dec-tempo
 (fn [db [_ tempo]]
   (update db :tempo #(- % 8))))

(reg-event-db
 :set-key
 (fn [db [_ key]]
   (assoc db :key key)))

(reg-event-db
 :tick!
 (fn [db [_ _]]
   (assoc (update
           (update db :mario-run #(if (= % 3) 1 (inc %)))
           :mario-jump inc)
          :time (music/current-time @audiocontext))))

(reg-event-db
 :jump-reset
 (fn [db [_ _]]
   (assoc db :mario-jump 0)))

(reg-event-db
 :jump!
 (fn [db [_ _]]
   (assoc db :mario-y 50)))

(reg-event-db
 :down!
 (fn [db [_ _]]
   (assoc db :mario-y 59)))
