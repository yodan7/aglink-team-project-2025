import { BookingFormInput, Farm } from "@/types";
import { useState } from "react";

export const useFormFarm = (id: Farm["id"]) => {
  const [formData, setFormData] = useState<BookingFormInput>({
    desiredDate: "",
    participants: 1,
    representativeName: "",
    farmId: id as Farm["id"],
  });
  const [submittedData, setSubmittedData] = useState<BookingFormInput | null>(
    null
  );
  // フォーム入力ハンドラ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) : value,
    }));
  };

  // フォーム送信ハンドラ
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.participants < 1 ||
      formData.desiredDate === "" ||
      formData.representativeName === ""
    ) {
      alert("日付、参加人数、お名前を正しく入力してください。");
      return;
    }
    console.log(`農場ID: ${formData.farmId} へのフォーム送信データ:`, formData);
    setSubmittedData(formData);
  };

  // 完了メッセージからフォームに戻るためのリセットハンドラ
  const handleReset = () => {
    setSubmittedData(null);
  };
  return { formData, handleChange, handleSubmit, submittedData, handleReset };
};
