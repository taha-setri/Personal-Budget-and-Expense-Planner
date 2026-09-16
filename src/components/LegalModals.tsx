import React from 'react';
import { ModalType } from '../types';
import { X, ShieldCheck, AlertTriangle, Cookie, User, ExternalLink } from 'lucide-react';

interface LegalModalsProps {
  activeModal: ModalType;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({ activeModal, onClose }) => {
  if (!activeModal || activeModal === 'add-transaction' || activeModal === 'budget-limits') {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[88vh] flex flex-col bg-[#0b1324] border border-cyan-500/40 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.2)] overflow-hidden"
        dir="rtl"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20 bg-slate-900/60">
          <div className="flex items-center gap-3">
            {activeModal === 'privacy' && (
              <>
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">سياسة الخصوصية (Privacy Policy)</h3>
                  <p className="text-xs text-slate-400">حماية تامة للبيانات المالية على جهازك الشخصي</p>
                </div>
              </>
            )}

            {activeModal === 'disclaimer' && (
              <>
                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">إخلاء المسؤولية (Disclaimer)</h3>
                  <p className="text-xs text-slate-400">توجيهات وإرشادات الاستخدام المالي</p>
                </div>
              </>
            )}

            {activeModal === 'cookies' && (
              <>
                <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <Cookie className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">سياسة ملفات الكوكيز والتخزين المحلي</h3>
                  <p className="text-xs text-slate-400">كيفية تخزين تفضيلاتك وسجلاتك المالية محلياً</p>
                </div>
              </>
            )}

            {activeModal === 'founder' && (
              <>
                <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">المؤسس والمطور (Founder Info)</h3>
                  <p className="text-xs text-slate-400">Taha setri - قيادة الابتكار والتصميم السايبراني</p>
                </div>
              </>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm text-slate-300 leading-relaxed">
          {activeModal === 'privacy' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-emerald-200 text-xs">
                🔒 <strong>الخصوصية المباشرة والمطلقة:</strong> جميع المعاملات، والميزانيات، والأرقام المالية المسجلة في هذا التطبيق تُحفظ حصرياً داخل متصفحك الشخصي عبر تقنية التخزين المحلي (LocalStorage). لا يتم إرسال أي أرقام إلى أي خادم خارجي.
              </div>

              <h4 className="text-white font-semibold text-base mt-2">1. جمع البيانات واستخدامها</h4>
              <p>
                لا يتطلب تطبيق "مخطط الميزانية والمصاريف الشخصية" إنشاء حساب أو تقديم بيانات تعريف شخصية مثل البريد الإلكتروني أو بطاقات الائتمان الحقيقية. يمكنك استخدامه بشكل مجهول وفوري.
              </p>

              <h4 className="text-white font-semibold text-base">2. التحكم في البيانات وحذفها</h4>
              <p>
                أنت المالك الوحيد لبياناتك المالية. يمكنك في أي لحظة النقر على خيار "إعادة ضبط ومسح البيانات" لحذف كافة العمليات والبيانات المخزنة نهائياً من متصفحك، كما يمكنك تصدير نسخ احتياطية بضغطة زر.
              </p>

              <h4 className="text-white font-semibold text-base">3. الأمان المالي</h4>
              <p>
                نظراً لعدم وجود اتصالات بخوادم وسيطة لتخزين سجلاتك، فإن بياناتك محصنة ضد التسريبات المركزية. نوصي بعدم مشاركة جهازك مع مستخدمين غير موثوقين لحماية سرية ميزانيتك.
              </p>
            </div>
          )}

          {activeModal === 'disclaimer' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/20 text-amber-200 text-xs">
                ⚠️ <strong>تنبيه قانوني ومالي:</strong> هذا التطبيق أداة تنظيمية رقمية مساعدة لتتبع الميزانية الشخصية، ولا يُعد بديلاً عن المشورة المالية أو الضريبية المتخصصة.
              </div>

              <h4 className="text-white font-semibold text-base">1. الغرض التعليمي والتنظيمي</h4>
              <p>
                تم تصميم نظام "مخطط الميزانية والمصاريف الشخصية" لمساعدة الأفراد في تنظيم نفقاتهم الشخصية، وتقدير المدخرات الشهرية بدقة وحساب المؤشرات التلقائية.
              </p>

              <h4 className="text-white font-semibold text-base">2. حدود المسؤولية</h4>
              <p>
                المطور والمؤسس <strong>Taha setri</strong> لا يتحمل أي مسؤولية عن أي قرارات استثمارية أو مالية أو تجارية يتخذها المستخدم بالاعتماد على الحسابات المعروضة في النظام. الأرقام نتاج مدخلات المستخدم الشخصية.
              </p>

              <h4 className="text-white font-semibold text-base">3. الحفظ المحلي للملفات</h4>
              <p>
                مسؤولية الحفاظ على البيانات وحفظ النسخ الاحتياطية تقع على عاتق المستخدم، حيث أن مسح بيانات المتصفح (Clear Cache/Storage) قد يؤدي إلى حذف السجلات المخزنة محلياً إذا لم يتم تصديرها.
              </p>
            </div>
          )}

          {activeModal === 'cookies' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-cyan-200 text-xs">
                🍪 <strong>إدارة التخزين (Cookies & LocalStorage):</strong> نستخدم التخزين المحلي للمتصفح لتذكر عملتك المفضلة، وسجلات ميزانيتك، وإعدادات العرض الخاصة بك.
              </div>

              <h4 className="text-white font-semibold text-base">1. ملفات تعريف الارتباط الوظيفية</h4>
              <p>
                نحن لا نستخدم ملفات تتبع إعلانية لأطراف ثالثة (Third-party tracking cookies). التقنية الأساسية المستخدمة هي <code className="text-cyan-400 bg-slate-800 px-1.5 py-0.5 rounded font-mono">window.localStorage</code> وهي تخزن فقط ما يلي:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-slate-300 pr-2">
                <li>قائمة المعاملات المالية (الدخل والمصاريف المسجلة).</li>
                <li>حدود الميزانية المحددة لكل فئة وتصنيف.</li>
                <li>العملة النشطة المفضلة للمستخدم.</li>
              </ul>

              <h4 className="text-white font-semibold text-base">2. إدارة تفضيلات التخزين</h4>
              <p>
                يمكنك مسح هذه الملفات في أي وقت مباشرة عبر إعدادات خصوصية متصفح الويب الخاص بك، أو عبر زر إعادة الضبط في اللوحة العلوية للتطبيق.
              </p>
            </div>
          )}

          {activeModal === 'founder' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/40 via-slate-900 to-cyan-950/40 border border-purple-500/30 flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                  TS
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Taha setri</h4>
                  <p className="text-cyan-400 text-xs font-mono">Visionary UI/UX Engineer & Digital Creator</p>
                  <p className="text-slate-400 text-xs mt-1">مؤسس ومطور أنظمة وتطبيقات الويب المستقبلية</p>
                </div>
              </div>

              <p>
                تم ابتكار وتطوير "مخطط الميزانية والمصاريف الشخصية" بواسطة <strong>Taha setri</strong> بهدف تقديم تجربة استخدام سايبرانية استثنائية (Cyberpunk Futuristic UI) تدمج بين الجماليات الزجاجية المصفرة (Glassmorphism)، الدقة الحسابية الفورية، والحماية الصارمة لخصوصية المستخدمين.
              </p>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="text-xs text-slate-400">المشاريع والمنصات التابعة للشبكة:</div>
                <a
                  href="https://idea-and-title-generator-for-conten.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/30 text-cyan-200 transition-colors group"
                >
                  <span className="font-medium text-xs">مولد الأفكار والعناوين لصناع المحتوى (الموقع السابق)</span>
                  <ExternalLink className="w-4 h-4 text-cyan-400 group-hover:translate-x-[-2px] transition-transform" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-cyan-500/20 bg-slate-900/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold transition-colors"
          >
            إغلاق النافذة
          </button>
        </div>
      </div>
    </div>
  );
};
