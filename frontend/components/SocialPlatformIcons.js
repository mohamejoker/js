/** 
 * SocialPlatformIcons
 * مكون رئيسي يعرض جميع منصات التواصل الاجتماعي كأيقونات تفاعلية مع نافذة تفاصيل لكل منصة.
 * يعتمد على SocialIcon و PlatformModal.
 *
 * الاستخدام: <SocialPlatformIcons />
 */
import React, { useState } from 'react';
import SocialIcon from './SocialIcon';
import PlatformModal from './PlatformModal';

export default function SocialPlatformIcons() {
  // حالة لتتبع المنصة المختارة لعرض تفاصيلها
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  // قائمة المنصات المدعومة
  const platforms = [
    'soundcloud', 'tiktok', 'snapchat', 'spotify', 'twitter',
    'instagram', 'telegram', 'youtube', 'facebook'
  ];

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {/* رسم أيقونة لكل منصة */}
      {platforms.map((platform) => (
        <SocialIcon
          key={platform}
          platform={platform}
          onClick={() => setSelectedPlatform(platform)}
          isActive={selectedPlatform === platform}
        />
      ))}
      {/* نافذة التفاصيل */}
      <PlatformModal
        platform={selectedPlatform}
        isOpen={!!selectedPlatform}
        onClose={() => setSelectedPlatform(null)}
      />
    </div>
  );
}