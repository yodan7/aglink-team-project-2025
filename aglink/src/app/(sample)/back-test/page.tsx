"use client";

import React from "react";
import { useFarms } from "@/hooks/useFarms";
import { getAllFarms } from "@/lib/database/farms";
import { supabase } from "@/lib/supabaseClient";

export default function Page() {
  //データを取得する関数
  const fetchData = async () => {
    const { data, error } = await supabase.from("agli_types").select("*");
    if (error) {
      console.error("Error fetching data:", error);
    } else {
      console.log("Data:", data);
    }
  };
  //入力からcodeを作成する関数
  const createTypeCode = () => {
    const axisAB = (
      document.querySelector(
        'input[name="axis-ab"]:checked'
      ) as HTMLInputElement
    )?.value;
    const axisFC = (
      document.querySelector(
        'input[name="axis-fc"]:checked'
      ) as HTMLInputElement
    )?.value;
    const axisHI = (
      document.querySelector(
        'input[name="axis-hi"]:checked'
      ) as HTMLInputElement
    )?.value;
    const axisOP = (
      document.querySelector(
        'input[name="axis-op"]:checked'
      ) as HTMLInputElement
    )?.value;

    if (axisAB && axisFC && axisHI && axisOP) {
      const typeCode = `${axisAB}${axisFC}${axisHI}${axisOP}`;
      console.log("Generated typeCode:", typeCode);
      // ここでtypeCodeを使ってさらに処理を行うことができます
      fetchByTypeCode(typeCode);
    }
  };

  //typeCodeを使ってagli-typesからデータを取得する関数
  const fetchByTypeCode = async (typeCode: string) => {
    const (data, error) = await supabase
    .from("agli_types")
    
  };

  return (
    <div>
      <div>必要な場面ごとのsupabaseによるデータの扱い方</div>
      <div>
        <div>基本的なデータの取得方法</div>
        <button onClick={fetchData}>データを取得</button>
      </div>
      <div>
        <div>
          ユーザーの選択によりtypeCodeを生成し、それをもとにagli_typesからデータを検索し取得する
        </div>
        <fieldset>
          <legend>A/S</legend>
          <input type="radio" name="axis-ab" id="axis-a" value="a" />
          <label htmlFor="axis-a">選択肢A</label>
          <input type="radio" name="axis-ab" id="axis-b" value="b" />
          <label htmlFor="axis-b">選択肢B</label>

          <legend>F/C</legend>
          <input type="radio" name="axis-fc" id="axis-f" value="f" />
          <label htmlFor="axis-f">選択肢F</label>
          <input type="radio" name="axis-fc" id="axis-c" value="c" />
          <label htmlFor="axis-c">選択肢C</label>

          <legend>H/I</legend>
          <input type="radio" name="axis-hi" id="axis-h" value="h" />
          <label htmlFor="axis-h">選択肢H</label>
          <input type="radio" name="axis-hi" id="axis-i" value="i" />
          <label htmlFor="axis-i">選択肢I</label>

          <legend>O/P</legend>
          <input type="radio" name="axis-op" id="axis-o" value="o" />
          <label htmlFor="axis-o">選択肢O</label>
          <input type="radio" name="axis-op" id="axis-p" value="p" />
          <label htmlFor="axis-p">選択肢P</label>

          <button type="button" onClick={createTypeCode}>
            決定
          </button>
        </fieldset>
      </div>
      <div>
        <div>typeCodeから農地データを検索し指定した数取得する</div>
      </div>
      <div>
        <div>ユーザー情報を登録する</div>
      </div>
      <div>
        <div>
          （発展）typeCodeをもとにしたagli_typesのデータやユーザーの選んだ選択肢から、gpt-apiを通してコメント分を生成し取得する
        </div>
      </div>
    </div>
  );
}
