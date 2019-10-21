// Compiled by ClojureScript 1.10.339 {:static-fns true, :optimize-constants true}
goog.provide('re_frame.trace');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('re_frame.interop');
goog.require('re_frame.loggers');
goog.require('goog.functions');
re_frame.trace.id = cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0));
re_frame.trace._STAR_current_trace_STAR_ = null;
re_frame.trace.reset_tracing_BANG_ = (function re_frame$trace$reset_tracing_BANG_(){
return cljs.core.reset_BANG_(re_frame.trace.id,(0));
});

/** @define {boolean} */
goog.define("re_frame.trace.trace_enabled_QMARK_",false);
/**
 * See https://groups.google.com/d/msg/clojurescript/jk43kmYiMhA/IHglVr_TPdgJ for more details
 */
re_frame.trace.is_trace_enabled_QMARK_ = (function re_frame$trace$is_trace_enabled_QMARK_(){
return re_frame.trace.trace_enabled_QMARK_;
});
re_frame.trace.trace_cbs = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
if((typeof re_frame !== 'undefined') && (typeof re_frame.trace !== 'undefined') && (typeof re_frame.trace.traces !== 'undefined')){
} else {
re_frame.trace.traces = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
}
if((typeof re_frame !== 'undefined') && (typeof re_frame.trace !== 'undefined') && (typeof re_frame.trace.next_delivery !== 'undefined')){
} else {
re_frame.trace.next_delivery = cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0));
}
/**
 * Registers a tracing callback function which will receive a collection of one or more traces.
 *   Will replace an existing callback function if it shares the same key.
 */
re_frame.trace.register_trace_cb = (function re_frame$trace$register_trace_cb(key,f){
if(re_frame.trace.trace_enabled_QMARK_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frame.trace.trace_cbs,cljs.core.assoc,key,f);
} else {
return re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(cljs.core.cst$kw$warn,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Tracing is not enabled. Please set {\"re_frame.trace.trace_enabled_QMARK_\" true} in :closure-defines. See: https://github.com/Day8/re-frame-10x#installation."], 0));
}
});
re_frame.trace.remove_trace_cb = (function re_frame$trace$remove_trace_cb(key){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(re_frame.trace.trace_cbs,cljs.core.dissoc,key);

return null;
});
re_frame.trace.next_id = (function re_frame$trace$next_id(){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(re_frame.trace.id,cljs.core.inc);
});
re_frame.trace.start_trace = (function re_frame$trace$start_trace(p__14813){
var map__14814 = p__14813;
var map__14814__$1 = ((((!((map__14814 == null)))?(((((map__14814.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14814.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14814):map__14814);
var operation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14814__$1,cljs.core.cst$kw$operation);
var op_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14814__$1,cljs.core.cst$kw$op_DASH_type);
var tags = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14814__$1,cljs.core.cst$kw$tags);
var child_of = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14814__$1,cljs.core.cst$kw$child_DASH_of);
return new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$id,re_frame.trace.next_id(),cljs.core.cst$kw$operation,operation,cljs.core.cst$kw$op_DASH_type,op_type,cljs.core.cst$kw$tags,tags,cljs.core.cst$kw$child_DASH_of,(function (){var or__3949__auto__ = child_of;
if(cljs.core.truth_(or__3949__auto__)){
return or__3949__auto__;
} else {
return cljs.core.cst$kw$id.cljs$core$IFn$_invoke$arity$1(re_frame.trace._STAR_current_trace_STAR_);
}
})(),cljs.core.cst$kw$start,re_frame.interop.now()], null);
});
re_frame.trace.debounce_time = (50);
re_frame.trace.debounce = (function re_frame$trace$debounce(f,interval){
return goog.functions.debounce(f,interval);
});
re_frame.trace.schedule_debounce = re_frame.trace.debounce((function re_frame$trace$tracing_cb_debounced(){
var seq__14816_14830 = cljs.core.seq(cljs.core.deref(re_frame.trace.trace_cbs));
var chunk__14817_14831 = null;
var count__14818_14832 = (0);
var i__14819_14833 = (0);
while(true){
if((i__14819_14833 < count__14818_14832)){
var vec__14820_14834 = chunk__14817_14831.cljs$core$IIndexed$_nth$arity$2(null,i__14819_14833);
var k_14835 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14820_14834,(0),null);
var cb_14836 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14820_14834,(1),null);
try{var G__14824_14837 = cljs.core.deref(re_frame.trace.traces);
(cb_14836.cljs$core$IFn$_invoke$arity$1 ? cb_14836.cljs$core$IFn$_invoke$arity$1(G__14824_14837) : cb_14836.call(null,G__14824_14837));
}catch (e14823){var e_14838 = e14823;
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(cljs.core.cst$kw$error,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Error thrown from trace cb",k_14835,"while storing",cljs.core.deref(re_frame.trace.traces),e_14838], 0));
}

var G__14839 = seq__14816_14830;
var G__14840 = chunk__14817_14831;
var G__14841 = count__14818_14832;
var G__14842 = (i__14819_14833 + (1));
seq__14816_14830 = G__14839;
chunk__14817_14831 = G__14840;
count__14818_14832 = G__14841;
i__14819_14833 = G__14842;
continue;
} else {
var temp__5457__auto___14843 = cljs.core.seq(seq__14816_14830);
if(temp__5457__auto___14843){
var seq__14816_14844__$1 = temp__5457__auto___14843;
if(cljs.core.chunked_seq_QMARK_(seq__14816_14844__$1)){
var c__4351__auto___14845 = cljs.core.chunk_first(seq__14816_14844__$1);
var G__14846 = cljs.core.chunk_rest(seq__14816_14844__$1);
var G__14847 = c__4351__auto___14845;
var G__14848 = cljs.core.count(c__4351__auto___14845);
var G__14849 = (0);
seq__14816_14830 = G__14846;
chunk__14817_14831 = G__14847;
count__14818_14832 = G__14848;
i__14819_14833 = G__14849;
continue;
} else {
var vec__14825_14850 = cljs.core.first(seq__14816_14844__$1);
var k_14851 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14825_14850,(0),null);
var cb_14852 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14825_14850,(1),null);
try{var G__14829_14853 = cljs.core.deref(re_frame.trace.traces);
(cb_14852.cljs$core$IFn$_invoke$arity$1 ? cb_14852.cljs$core$IFn$_invoke$arity$1(G__14829_14853) : cb_14852.call(null,G__14829_14853));
}catch (e14828){var e_14854 = e14828;
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(cljs.core.cst$kw$error,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Error thrown from trace cb",k_14851,"while storing",cljs.core.deref(re_frame.trace.traces),e_14854], 0));
}

var G__14855 = cljs.core.next(seq__14816_14844__$1);
var G__14856 = null;
var G__14857 = (0);
var G__14858 = (0);
seq__14816_14830 = G__14855;
chunk__14817_14831 = G__14856;
count__14818_14832 = G__14857;
i__14819_14833 = G__14858;
continue;
}
} else {
}
}
break;
}

return cljs.core.reset_BANG_(re_frame.trace.traces,cljs.core.PersistentVector.EMPTY);
}),re_frame.trace.debounce_time);
re_frame.trace.run_tracing_callbacks_BANG_ = (function re_frame$trace$run_tracing_callbacks_BANG_(now){
if(((cljs.core.deref(re_frame.trace.next_delivery) - (25)) < now)){
(re_frame.trace.schedule_debounce.cljs$core$IFn$_invoke$arity$0 ? re_frame.trace.schedule_debounce.cljs$core$IFn$_invoke$arity$0() : re_frame.trace.schedule_debounce.call(null));

return cljs.core.reset_BANG_(re_frame.trace.next_delivery,(now + re_frame.trace.debounce_time));
} else {
return null;
}
});
