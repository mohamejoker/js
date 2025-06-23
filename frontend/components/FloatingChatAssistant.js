import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { MessageCircle, Send, X, Bot, User } from 'lucide-react';

export default function FloatingChatAssistant() {
  return null;
}

// const FloatingChatAssistant = () => {
//   const { t } = useTranslation('common');
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     {
//       type: 'bot',
//       content: t('chat.welcome'),
//       timestamp: new Date()
//     }
//   ]);
//   const [inputValue, setInputValue] = useState('');
//   const [isTyping, setIsTyping] = useState(false);

//   const suggestions = t('chat.suggestions', { returnObjects: true });

//   const handleSuggestionClick = (suggestion) => {
//     handleSendMessage(suggestion);
//   };

//   const handleSendMessage = async (message = inputValue) => {
//     if (!message.trim()) return;

//     // Add user message
//     const userMessage = {
//       type: 'user',
//       content: message,
//       timestamp: new Date()
//     };

//     setMessages(prev => [...prev, userMessage]);
//     setInputValue('');
//     setIsTyping(true);

//     // Simulate bot response
//     setTimeout(() => {
//       const botResponse = getBotResponse(message);
//       setMessages(prev => [...prev, {
//         type: 'bot',
//         content: botResponse,
//         timestamp: new Date()
//       }]);
//       setIsTyping(false);
//     }, 1500);
//   };

//   const getBotResponse = (userMessage) => {
//     const message = userMessage.toLowerCase();
    
//     if (message.includes('إنستجرام') || message.includes('instagram')) {
//       return 'نقدم خدمات نمو الإنستجرام مع متابعين حقيقيين وإعجابات طبيعية. يمكنك الحصول على 1000-10000 متابع حقيقي خلال أسبوع واحد! هل تريد معرفة المزيد عن الباقات؟';
//     }
    
//     if (message.includes('تيك توك') || message.includes('tiktok')) {
//       return 'خدمات التيك توك تشمل زيادة المشاهدات والمتابعين والإعجابات. نضمن لك محتوى فيرالي ووصول أوسع! الأسعار تبدأ من 50 ريال للباقة الأساسية.';
    }
    
    // if (message.includes('سعر') || message.includes('تكلفة') || message.includes('pricing')) {
    //   return 'أسعارنا تنافسية جداً! تبدأ الباقات من 30 ريال للخدمات الأساسية وتصل إلى 500 ريال للباقات المتقدمة. كل باقة تأتي مع ضمان كامل! أي منصة تهمك أكثر؟';
    // }
    
    // if (message.includes('آمن') || message.includes('أمان') || message.includes('safe')) {
    //   return 'جميع خدماتنا آمنة 100% ولا تنتهك شروط المنصات. نستخدم تقنيات متطورة لضمان الحماية الكاملة لحسابك. لدينا أكثر من 15000 عميل راضٍ بدون أي مشاكل!';
    // }
    
    // if (message.includes('وقت') || message.includes('سرعة') || message.includes('time')) {
    //   return 'النتائج تبدأ خلال 24-48 ساعة من بدء الخدمة! المتابعون الحقيقيون يصلون تدريجياً خلال 7-14 يوم حسب الباقة المختارة. السرعة مع الجودة مضمونة!';
    // }
    
    // return 'شكراً لسؤالك! فريقنا المتخصص متاح لمساعدتك على مدار الساعة. يمكنك التواصل معنا مباشرة أو اختيار الخدمة المناسبة من موقعنا. هل هناك منصة معينة تريد التركيز عليها؟';
  // };

  // const handleKeyPress = (e) => {
  //   if (e.key === 'Enter' && !e.shiftKey) {
  //     e.preventDefault();
  //     handleSendMessage();
  //   }
  // };

  // return (
  //   <div className="fixed bottom-6 right-6 z-50">
  //     <AnimatePresence>
  //       {isOpen && (
  //         <motion.div
  //           initial={{ opacity: 0, scale: 0.8, y: 20 }}
  //           animate={{ opacity: 1, scale: 1, y: 0 }}
  //           exit={{ opacity: 0, scale: 0.8, y: 20 }}
  //           className="mb-4 bg-gray-900/95 backdrop-blur-xl rounded-3xl border border-gray-700/50 w-96 h-[500px] shadow-2xl flex flex-col overflow-hidden"
  //         >
  //           {/* Header */}
  //           <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between">
  //             <div className="flex items-center space-x-3 rtl:space-x-reverse">
  //               <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
  //                 <Bot className="w-6 h-6 text-white" />
  //               </div>
  //               <div>
  //                 <h3 className="text-white font-bold">{t('chat.title')}</h3>
  //                 <p className="text-blue-100 text-sm">متاح الآن</p>
  //               </div>
  //             </div>
  //             <button
  //               onClick={() => setIsOpen(false)}
  //               className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
  //             >
  //               <X className="w-5 h-5" />
  //             </button>
  //           </div>

  //           {/* Messages */}
  //           <div className="flex-1 p-4 overflow-y-auto space-y-4">
  //             {messages.map((message, index) => (
  //               <motion.div
  //                 key={index}
  //                 initial={{ opacity: 0, y: 10 }}
  //                 animate={{ opacity: 1, y: 0 }}
  //                 className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
  //               >
  //                 <div className={`flex items-end space-x-2 rtl:space-x-reverse max-w-[80%] ${
  //                   message.type === 'user' ? 'flex-row-reverse rtl:flex-row' : ''
  //                 }`}>
  //                   <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
  //                     message.type === 'user' 
  //                       ? 'bg-blue-600' 
  //                       : 'bg-gradient-to-r from-purple-500 to-pink-500'
  //                   }`}>
  //                     {message.type === 'user' ? (
  //                       <User className="w-4 h-4 text-white" />
  //                     ) : (
  //                       <Bot className="w-4 h-4 text-white" />
  //                     )}
  //                   </div>
  //                   <div className={`px-4 py-3 rounded-2xl ${
  //                     message.type === 'user'
  //                       ? 'bg-blue-600 text-white rounded-br-md'
  //                       : 'bg-gray-800 text-gray-200 rounded-bl-md'
  //                   }`}>
  //                     <p className="text-sm leading-relaxed">{message.content}</p>
  //                   </div>
  //                 </div>
  //               </motion.div>
  //             ))}
              
  //             {isTyping && (
  //               <motion.div
  //                 initial={{ opacity: 0 }}
  //                 animate={{ opacity: 1 }}
  //                 className="flex justify-start"
  //               >
  //                 <div className="flex items-end space-x-2 rtl:space-x-reverse">
  //                   <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
  //                     <Bot className="w-4 h-4 text-white" />
  //                   </div>
  //                   <div className="bg-gray-800 px-4 py-3 rounded-2xl rounded-bl-md">
  //                     <div className="flex space-x-1">
  //                       <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
  //                       <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
  //                       <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
  //                     </div>
  //                   </div>
  //                 </div>
  //               </motion.div>
  //             )}
  //           </div>

  //           {/* Quick Suggestions */}
  //           {messages.length === 1 && (
  //             <div className="p-4 border-t border-gray-700/50">
  //               <p className="text-gray-400 text-sm mb-3">اقتراحات سريعة:</p>
  //               <div className="space-y-2">
  //                 {suggestions.slice(0, 3).map((suggestion, index) => (
  //                   <button
  //                     key={index}
  //                     onClick={() => handleSuggestionClick(suggestion)}
  //                     className="block w-full text-left text-sm text-gray-300 hover:text-blue-400 p-2 rounded-lg hover:bg-gray-800/50 transition-colors duration-200"
  //                   >
  //                     {suggestion}
  //                   </button>
  //                 ))}
  //               </div>
  //             </div>
  //           )}

  //           {/* Input */}
  //           <div className="p-4 border-t border-gray-700/50">
  //             <div className="flex space-x-2 rtl:space-x-reverse">
  //               <input
  //                 type="text"
  //                 value={inputValue}
  //                 onChange={(e) => setInputValue(e.target.value)}
  //                 onKeyPress={handleKeyPress}
  //                 placeholder={t('chat.placeholder')}
  //                 className="flex-1 bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 text-sm"
  //               />
  //               <motion.button
  //                 onClick={() => handleSendMessage()}
  //                 whileHover={{ scale: 1.05 }}
  //                 whileTap={{ scale: 0.95 }}
  //                 disabled={!inputValue.trim()}
  //                 className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all duration-200"
  //               >
  //                 <Send className="w-4 h-4" />
  //               </motion.button>
  //             </div>
  //           </div>
  //         </motion.div>
  //       )}
  //     </AnimatePresence>
      
  //     {/* Chat Button */}
  //     <motion.button
  //       whileHover={{ scale: 1.1 }}
  //       whileTap={{ scale: 0.9 }}
  //       onClick={() => setIsOpen(!isOpen)}
  //       className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 relative"
  //     >
  //       <AnimatePresence mode="wait">
  //         {isOpen ? (
  //           <motion.div
  //             key="close"
  //             initial={{ rotate: 90, opacity: 0 }}
  //             animate={{ rotate: 0, opacity: 1 }}
  //             exit={{ rotate: -90, opacity: 0 }}
  //             transition={{ duration: 0.2 }}
  //           >
  //             <X className="w-6 h-6" />
  //           </motion.div>
  //         ) : (
  //           <motion.div
  //             key="chat"
  //             initial={{ rotate: -90, opacity: 0 }}
  //             animate={{ rotate: 0, opacity: 1 }}
  //             exit={{ rotate: 90, opacity: 0 }}
  //             transition={{ duration: 0.2 }}
  //           >
  //             <MessageCircle className="w-6 h-6" />
  //           </motion.div>
  //         )}
  //       </AnimatePresence>
        
  //       {/* Notification dot */}
  //       {!isOpen && (
  //         <motion.div
  //           animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
  //           transition={{ duration: 2, repeat: Infinity }}
  //           className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"
  //         />
  //       )}
  //     </motion.button>
  // };
// };

// export default FloatingChatAssistant;