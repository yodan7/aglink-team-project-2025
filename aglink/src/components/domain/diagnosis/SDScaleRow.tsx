// src/components/domain/diagnosis/SDScaleRow.tsx

import React from 'react';
import { DiagnosisQuestion } from '@/types';

// SDScaleRowに必要なPropsを定義
interface SDScaleRowProps extends Omit<DiagnosisQuestion, 'scaleMax'> {
  value: number | undefined; // 現在の回答値 (1-7, または undefined)
  onChange: (value: number) => void; // 回答が変更されたときに親に通知するハンドラ
}

export const SDScaleRow: React.FC<SDScaleRowProps> = ({
  id,
  label,
  left,
  right,
  value,
  onChange,
}) => {
  const scale = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="mb-6 p-4 border border-gray-200 rounded-xl shadow-sm bg-white">
      <p className="font-semibold text-lg text-gray-800 mb-3">{label}</p>
      
      <div className="flex justify-between items-center space-x-2">
        {/* 左の対立形容詞 */}
        <span className="font-bold text-red-600 w-1/5 text-left pr-2">{left}</span>
        
        {/* 7段階のラジオボタン */}
        <div className="flex justify-around w-3/5">
          {scale.map((num) => (
            <label 
              key={num} 
              className={`flex flex-col items-center p-1 rounded-full cursor-pointer transition-all ${
                value === num ? 'bg-green-100 ring-2 ring-green-500' : 'hover:bg-gray-100'
              }`}
              title={`${left}から${right}への${num}段階目`}
            >
              <input
                type="radio"
                name={`sd_scale_${id}`}
                value={num}
                checked={value === num}
                onChange={() => onChange(num)}
                className="form-radio h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
              />
              <span className="text-xs mt-1 text-gray-600 font-medium">{num}</span>
            </label>
          ))}
        </div>
        
        {/* 右の対立形容詞 */}
        <span className="font-bold text-blue-600 w-1/5 text-right pl-2">{right}</span>
      </div>
    </div>
  );
};