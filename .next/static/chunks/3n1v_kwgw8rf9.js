(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,8966,e=>{"use strict";var t=e.i(43476);e.s(["default",0,function(){return(0,t.jsx)("div",{className:"bg-[#fdfdff] min-h-screen text-xs text-neutral-800 p-4 sm:p-12 antialiased",children:(0,t.jsxs)("div",{className:"max-w-2xl mx-auto space-y-8 pt-6",children:[(0,t.jsxs)("header",{className:"space-y-1",children:[(0,t.jsx)("span",{className:"text-[9px] font-bold text-purple-600 uppercase tracking-widest",children:"Comptabilité"}),(0,t.jsx)("h1",{className:"text-2xl font-serif text-neutral-900 tracking-wide",children:"Factures & Reçus"}),(0,t.jsx)("p",{className:"text-neutral-400 font-light",children:"Téléchargez vos justificatifs d'achat et vos reçus de paiement."})]}),(0,t.jsx)("div",{className:"bg-white border border-neutral-200/70 rounded-3xl shadow-sm overflow-hidden",children:[{id:"FAC-2026-001",date:"22 Juin 2026",amount:"45.000 F CFA"}].map(e=>(0,t.jsxs)("div",{className:"flex justify-between items-center p-4 border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50 transition-colors",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"font-mono font-bold text-neutral-900",children:e.id}),(0,t.jsxs)("p",{className:"text-neutral-400 text-[10px] mt-0.5",children:["Payée le ",e.date]})]}),(0,t.jsxs)("div",{className:"flex items-center gap-4",children:[(0,t.jsx)("span",{className:"font-bold text-neutral-800",children:e.amount}),(0,t.jsx)("button",{onClick:()=>{let t=new Blob([`
=========================================
               SYLITE SHOP
=========================================
Facture N\xb0 : ${e.id}
Date       : ${e.date}
Statut     : PAY\xc9E
-----------------------------------------
Article    : Articles de Mode & Accessoires
Montant Total : ${e.amount}
-----------------------------------------
Merci pour votre achat chez SYLITE !
=========================================
                    `.trim()],{type:"text/plain"}),a=URL.createObjectURL(t),r=document.createElement("a");r.href=a,r.download=`Facture_SYLITE_${e.id}.txt`,r.click(),URL.revokeObjectURL(a)},className:"text-purple-600 hover:text-purple-800 font-bold border border-purple-100 bg-purple-50/50 px-2.5 py-1 rounded-lg transition-colors",children:"Télécharger 📥"})]})]},e.id))})]})})}])}]);