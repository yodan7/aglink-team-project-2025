// aglink/src/components/domain/home/FarmIllustration.tsx
import React from "react";

export const FarmIllustration: React.FC = () => (
  <div className="relative w-full flex justify-center items-end space-x-2 sm:space-x-4 md:space-x-6 h-40 sm:h-56 lg:h-64">
    <img 
      src="https://loosedrawing.com/assets/media/illustrations/png/715.png" 
      alt="野菜かごを持つ農家" 
      className="h-32 sm:h-48 lg:h-56 object-contain"
    />
    <img 
      src="https://loosedrawing.com/assets/media/illustrations/png/872.png" 
      alt="トラクターや作物などの農業イラスト" 
      className="h-28 sm:h-40 lg:h-48 object-contain"
    />
    <img 
      src="https://loosedrawing.com/assets/media/illustrations/png/719.png" 
      alt="耕運機を使う農家" 
      className="h-32 sm:h-48 lg:h-56 object-contain"
    />
  </div>
);
