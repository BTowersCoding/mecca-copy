goog.provide('day8.re_frame.undo');
goog.require('cljs.core');
goog.require('reagent.core');
goog.require('re_frame.core');
goog.require('re_frame.db');
day8.re_frame.undo.config = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"max-undos","max-undos",-911142923),(50),new cljs.core.Keyword(null,"harvest-fn","harvest-fn",9140059),cljs.core.deref,new cljs.core.Keyword(null,"reinstate-fn","reinstate-fn",1996128442),cljs.core.reset_BANG_], null));
/**
 * Set configuration parameters for library.
 * 
 *   Should be called on app startup.
 */
day8.re_frame.undo.undo_config_BANG_ = (function day8$re_frame$undo$undo_config_BANG_(new_config){
var temp__5733__auto__ = cljs.core.seq(clojure.set.difference.cljs$core$IFn$_invoke$arity$2(cljs.core.set(cljs.core.keys(new_config)),cljs.core.set(cljs.core.keys(cljs.core.deref(day8.re_frame.undo.config)))));
if(temp__5733__auto__){
var unknown_keys = temp__5733__auto__;
var G__37497 = new cljs.core.Keyword(null,"error","error",-978969032);
var G__37498 = "re-frame-undo: undo-config! called within unknown keys: ";
var G__37499 = unknown_keys;
return (re_frame.core.console.cljs$core$IFn$_invoke$arity$3 ? re_frame.core.console.cljs$core$IFn$_invoke$arity$3(G__37497,G__37498,G__37499) : re_frame.core.console.call(null,G__37497,G__37498,G__37499));
} else {
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(day8.re_frame.undo.config,cljs.core.merge,new_config);
}
});
day8.re_frame.undo.max_undos = (function day8$re_frame$undo$max_undos(){
return new cljs.core.Keyword(null,"max-undos","max-undos",-911142923).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(day8.re_frame.undo.config));
});
/**
 * A list of history states
 */
day8.re_frame.undo.undo_list = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
/**
 * A list of future states, caused by undoing
 */
day8.re_frame.undo.redo_list = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
/**
 * Mirrors app-db
 */
day8.re_frame.undo.app_explain = reagent.core.atom.cljs$core$IFn$_invoke$arity$1("");
/**
 * Mirrors undo-list
 */
day8.re_frame.undo.undo_explain_list = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
/**
 * Mirrors redo-list
 */
day8.re_frame.undo.redo_explain_list = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
day8.re_frame.undo.clear_undos_BANG_ = (function day8$re_frame$undo$clear_undos_BANG_(){
cljs.core.reset_BANG_(day8.re_frame.undo.undo_list,cljs.core.PersistentVector.EMPTY);

return cljs.core.reset_BANG_(day8.re_frame.undo.undo_explain_list,cljs.core.PersistentVector.EMPTY);
});
day8.re_frame.undo.clear_redos_BANG_ = (function day8$re_frame$undo$clear_redos_BANG_(){
cljs.core.reset_BANG_(day8.re_frame.undo.redo_list,cljs.core.PersistentVector.EMPTY);

return cljs.core.reset_BANG_(day8.re_frame.undo.redo_explain_list,cljs.core.PersistentVector.EMPTY);
});
day8.re_frame.undo.clear_history_BANG_ = (function day8$re_frame$undo$clear_history_BANG_(){
day8.re_frame.undo.clear_undos_BANG_();

day8.re_frame.undo.clear_redos_BANG_();

return cljs.core.reset_BANG_(day8.re_frame.undo.app_explain,"");
});
/**
 * Stores the value currently in app-db, so the user can later undo
 */
day8.re_frame.undo.store_now_BANG_ = (function day8$re_frame$undo$store_now_BANG_(explanation){
day8.re_frame.undo.clear_redos_BANG_();

cljs.core.reset_BANG_(day8.re_frame.undo.undo_list,cljs.core.vec(cljs.core.take_last(day8.re_frame.undo.max_undos(),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(day8.re_frame.undo.undo_list),(function (){var fexpr__37512 = new cljs.core.Keyword(null,"harvest-fn","harvest-fn",9140059).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(day8.re_frame.undo.config));
return (fexpr__37512.cljs$core$IFn$_invoke$arity$1 ? fexpr__37512.cljs$core$IFn$_invoke$arity$1(re_frame.db.app_db) : fexpr__37512.call(null,re_frame.db.app_db));
})()))));

cljs.core.reset_BANG_(day8.re_frame.undo.undo_explain_list,cljs.core.vec(cljs.core.take_last(day8.re_frame.undo.max_undos(),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(day8.re_frame.undo.undo_explain_list),cljs.core.deref(day8.re_frame.undo.app_explain)))));

return cljs.core.reset_BANG_(day8.re_frame.undo.app_explain,explanation);
});
/**
 * Returns true if undos exist, false otherwise
 */
day8.re_frame.undo.undos_QMARK_ = (function day8$re_frame$undo$undos_QMARK_(){
return cljs.core.seq(cljs.core.deref(day8.re_frame.undo.undo_list));
});
/**
 * Returns true if redos exist, false otherwise
 */
day8.re_frame.undo.redos_QMARK_ = (function day8$re_frame$undo$redos_QMARK_(){
return cljs.core.seq(cljs.core.deref(day8.re_frame.undo.redo_list));
});
/**
 * Returns a vector of undo descriptions, perhaps empty
 */
day8.re_frame.undo.undo_explanations = (function day8$re_frame$undo$undo_explanations(){
if(day8.re_frame.undo.undos_QMARK_()){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(day8.re_frame.undo.undo_explain_list),cljs.core.deref(day8.re_frame.undo.app_explain));
} else {
return cljs.core.PersistentVector.EMPTY;
}
});
re_frame.core.reg_sub_raw(new cljs.core.Keyword(null,"undos?","undos?",-1094259081),(function day8$re_frame$undo$handler(_,___$1){
return reagent.ratom.make_reaction((function (){
return day8.re_frame.undo.undos_QMARK_();
}));
}));
re_frame.core.reg_sub_raw(new cljs.core.Keyword(null,"redos?","redos?",1340247550),(function day8$re_frame$undo$handler(_,___$1){
return reagent.ratom.make_reaction((function (){
return day8.re_frame.undo.redos_QMARK_();
}));
}));
re_frame.core.reg_sub_raw(new cljs.core.Keyword(null,"undo-explanations","undo-explanations",942251259),(function day8$re_frame$undo$handler(_,___$1){
return reagent.ratom.make_reaction((function (){
return day8.re_frame.undo.undo_explanations();
}));
}));
re_frame.core.reg_sub_raw(new cljs.core.Keyword(null,"redo-explanations","redo-explanations",-1933832741),(function day8$re_frame$undo$handler(_,___$1){
return reagent.ratom.make_reaction((function (){
return cljs.core.deref(day8.re_frame.undo.redo_explain_list);
}));
}));
day8.re_frame.undo.undo = (function day8$re_frame$undo$undo(harvester,reinstater,undos,cur,redos){
var u = cljs.core.deref(undos);
var r = cljs.core.cons((harvester.cljs$core$IFn$_invoke$arity$1 ? harvester.cljs$core$IFn$_invoke$arity$1(cur) : harvester.call(null,cur)),cljs.core.deref(redos));
var G__37531_37644 = cur;
var G__37532_37645 = cljs.core.last(u);
(reinstater.cljs$core$IFn$_invoke$arity$2 ? reinstater.cljs$core$IFn$_invoke$arity$2(G__37531_37644,G__37532_37645) : reinstater.call(null,G__37531_37644,G__37532_37645));

cljs.core.reset_BANG_(redos,r);

return cljs.core.reset_BANG_(undos,cljs.core.pop(u));
});
/**
 * undo n steps or until we run out of undos
 */
day8.re_frame.undo.undo_n = (function day8$re_frame$undo$undo_n(n){
while(true){
if((((n > (0))) && (day8.re_frame.undo.undos_QMARK_()))){
day8.re_frame.undo.undo(new cljs.core.Keyword(null,"harvest-fn","harvest-fn",9140059).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(day8.re_frame.undo.config)),new cljs.core.Keyword(null,"reinstate-fn","reinstate-fn",1996128442).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(day8.re_frame.undo.config)),day8.re_frame.undo.undo_list,re_frame.db.app_db,day8.re_frame.undo.redo_list);

day8.re_frame.undo.undo(cljs.core.deref,cljs.core.reset_BANG_,day8.re_frame.undo.undo_explain_list,day8.re_frame.undo.app_explain,day8.re_frame.undo.redo_explain_list);

var G__37652 = (n - (1));
n = G__37652;
continue;
} else {
return null;
}
break;
}
});
day8.re_frame.undo.undo_handler = (function day8$re_frame$undo$undo_handler(_,p__37538){
var vec__37539 = p__37538;
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37539,(0),null);
var n = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37539,(1),null);
if(cljs.core.not(day8.re_frame.undo.undos_QMARK_())){
var G__37542_37653 = new cljs.core.Keyword(null,"warn","warn",-436710552);
var G__37543_37654 = "re-frame: you did a (dispatch [:undo]), but there is nothing to undo.";
(re_frame.core.console.cljs$core$IFn$_invoke$arity$2 ? re_frame.core.console.cljs$core$IFn$_invoke$arity$2(G__37542_37653,G__37543_37654) : re_frame.core.console.call(null,G__37542_37653,G__37543_37654));
} else {
day8.re_frame.undo.undo_n((function (){var or__4185__auto__ = n;
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return (1);
}
})());
}

return cljs.core.PersistentArrayMap.EMPTY;
});
day8.re_frame.undo.redo = (function day8$re_frame$undo$redo(harvester,reinstater,undos,cur,redos){
var u = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(undos),(harvester.cljs$core$IFn$_invoke$arity$1 ? harvester.cljs$core$IFn$_invoke$arity$1(cur) : harvester.call(null,cur)));
var r = cljs.core.deref(redos);
var G__37544_37656 = cur;
var G__37545_37657 = cljs.core.first(r);
(reinstater.cljs$core$IFn$_invoke$arity$2 ? reinstater.cljs$core$IFn$_invoke$arity$2(G__37544_37656,G__37545_37657) : reinstater.call(null,G__37544_37656,G__37545_37657));

cljs.core.reset_BANG_(redos,cljs.core.rest(r));

return cljs.core.reset_BANG_(undos,u);
});
/**
 * redo n steps or until we run out of redos
 */
day8.re_frame.undo.redo_n = (function day8$re_frame$undo$redo_n(n){
while(true){
if((((n > (0))) && (day8.re_frame.undo.redos_QMARK_()))){
day8.re_frame.undo.redo(new cljs.core.Keyword(null,"harvest-fn","harvest-fn",9140059).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(day8.re_frame.undo.config)),new cljs.core.Keyword(null,"reinstate-fn","reinstate-fn",1996128442).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(day8.re_frame.undo.config)),day8.re_frame.undo.undo_list,re_frame.db.app_db,day8.re_frame.undo.redo_list);

day8.re_frame.undo.redo(cljs.core.deref,cljs.core.reset_BANG_,day8.re_frame.undo.undo_explain_list,day8.re_frame.undo.app_explain,day8.re_frame.undo.redo_explain_list);

var G__37663 = (n - (1));
n = G__37663;
continue;
} else {
return null;
}
break;
}
});
day8.re_frame.undo.redo_handler = (function day8$re_frame$undo$redo_handler(_,p__37546){
var vec__37547 = p__37546;
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37547,(0),null);
var n = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37547,(1),null);
if(cljs.core.not(day8.re_frame.undo.redos_QMARK_())){
var G__37550_37666 = new cljs.core.Keyword(null,"warn","warn",-436710552);
var G__37551_37667 = "re-frame: you did a (dispatch [:redo]), but there is nothing to redo.";
(re_frame.core.console.cljs$core$IFn$_invoke$arity$2 ? re_frame.core.console.cljs$core$IFn$_invoke$arity$2(G__37550_37666,G__37551_37667) : re_frame.core.console.call(null,G__37550_37666,G__37551_37667));
} else {
day8.re_frame.undo.redo_n((function (){var or__4185__auto__ = n;
if(cljs.core.truth_(or__4185__auto__)){
return or__4185__auto__;
} else {
return (1);
}
})());
}

return cljs.core.PersistentArrayMap.EMPTY;
});
day8.re_frame.undo.purge_redo_handler = (function day8$re_frame$undo$purge_redo_handler(db,_){
if(cljs.core.not(day8.re_frame.undo.redos_QMARK_())){
var G__37552_37672 = new cljs.core.Keyword(null,"warn","warn",-436710552);
var G__37553_37673 = "re-frame: you did a (dispatch [:purge-redos]), but there is nothing to redo.";
(re_frame.core.console.cljs$core$IFn$_invoke$arity$2 ? re_frame.core.console.cljs$core$IFn$_invoke$arity$2(G__37552_37672,G__37553_37673) : re_frame.core.console.call(null,G__37552_37672,G__37553_37673));
} else {
day8.re_frame.undo.clear_redos_BANG_();
}

return db;
});
/**
 * returns a side-effecting Interceptor, which stores an undo checkpoint in
 *   `:after` processing.
 * If the `:effect` cotnains an `:undo` key, then use the explanation provided
 * by it. Otherwise, `explanation` can be:
 *   - a string (of explanation)
 *   - a function expected to return a string of explanation. It will be called
 *     with two arguments: `db` and `event-vec`.
 *   - a nil, in which case "" is recorded as the explanation
 *   
 */
day8.re_frame.undo.undoable = (function day8$re_frame$undo$undoable(var_args){
var G__37555 = arguments.length;
switch (G__37555) {
case 0:
return day8.re_frame.undo.undoable.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return day8.re_frame.undo.undoable.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(day8.re_frame.undo.undoable.cljs$core$IFn$_invoke$arity$0 = (function (){
return day8.re_frame.undo.undoable.cljs$core$IFn$_invoke$arity$1(null);
}));

(day8.re_frame.undo.undoable.cljs$core$IFn$_invoke$arity$1 = (function (explanation){
var G__37556 = new cljs.core.Keyword(null,"id","id",-1388402092);
var G__37557 = new cljs.core.Keyword(null,"undoable","undoable",303475882);
var G__37558 = new cljs.core.Keyword(null,"after","after",594996914);
var G__37559 = (function (context){
var event = (function (){var G__37561 = context;
var G__37562 = new cljs.core.Keyword(null,"event","event",301435442);
return (re_frame.core.get_coeffect.cljs$core$IFn$_invoke$arity$2 ? re_frame.core.get_coeffect.cljs$core$IFn$_invoke$arity$2(G__37561,G__37562) : re_frame.core.get_coeffect.call(null,G__37561,G__37562));
})();
var undo_effect = (function (){var G__37563 = context;
var G__37564 = new cljs.core.Keyword(null,"undo","undo",-1818036302);
return (re_frame.core.get_effect.cljs$core$IFn$_invoke$arity$2 ? re_frame.core.get_effect.cljs$core$IFn$_invoke$arity$2(G__37563,G__37564) : re_frame.core.get_effect.call(null,G__37563,G__37564));
})();
var explanation__$1 = (((!((undo_effect == null))))?undo_effect:((cljs.core.fn_QMARK_(explanation))?(function (){var G__37565 = (function (){var G__37567 = context;
var G__37568 = new cljs.core.Keyword(null,"db","db",993250759);
return (re_frame.core.get_coeffect.cljs$core$IFn$_invoke$arity$2 ? re_frame.core.get_coeffect.cljs$core$IFn$_invoke$arity$2(G__37567,G__37568) : re_frame.core.get_coeffect.call(null,G__37567,G__37568));
})();
var G__37566 = event;
return (explanation.cljs$core$IFn$_invoke$arity$2 ? explanation.cljs$core$IFn$_invoke$arity$2(G__37565,G__37566) : explanation.call(null,G__37565,G__37566));
})():((typeof explanation === 'string')?explanation:(((explanation == null))?"":(function (){var G__37570 = new cljs.core.Keyword(null,"error","error",-978969032);
var G__37571 = "re-frame-undo: \"undoable\" interceptor on event ";
var G__37572 = event;
var G__37573 = " given a bad parameter. Got: ";
var G__37574 = explanation;
return (re_frame.core.console.cljs$core$IFn$_invoke$arity$5 ? re_frame.core.console.cljs$core$IFn$_invoke$arity$5(G__37570,G__37571,G__37572,G__37573,G__37574) : re_frame.core.console.call(null,G__37570,G__37571,G__37572,G__37573,G__37574));
})()
))));
day8.re_frame.undo.store_now_BANG_(explanation__$1);

return cljs.core.update.cljs$core$IFn$_invoke$arity$4(context,new cljs.core.Keyword(null,"effects","effects",-282369292),cljs.core.dissoc,new cljs.core.Keyword(null,"undo","undo",-1818036302));
});
return (re_frame.core.__GT_interceptor.cljs$core$IFn$_invoke$arity$4 ? re_frame.core.__GT_interceptor.cljs$core$IFn$_invoke$arity$4(G__37556,G__37557,G__37558,G__37559) : re_frame.core.__GT_interceptor.call(null,G__37556,G__37557,G__37558,G__37559));
}));

(day8.re_frame.undo.undoable.cljs$lang$maxFixedArity = 1);

day8.re_frame.undo.register_events_subs_BANG_ = (function day8$re_frame$undo$register_events_subs_BANG_(){
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"undo","undo",-1818036302),day8.re_frame.undo.undo_handler);

re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"redo","redo",501190664),day8.re_frame.undo.redo_handler);

return re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"purge-redos","purge-redos",1815721624),day8.re_frame.undo.purge_redo_handler);
});
day8.re_frame.undo.register_events_subs_BANG_();

//# sourceMappingURL=day8.re_frame.undo.js.map
