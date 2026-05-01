import { NextRequest } from 'next/server';
import OpenAI from 'openai';
import type { DiagnosisFormData, DiagnosisResult } from '@/lib/types';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: NextRequest) {
  try {
    const form: DiagnosisFormData = await request.json();

    const prompt = `あなたはSNSマーケティングの専門家です。以下の診断回答をもとに、ユーザーのSNS運用タイプを診断してください。

診断回答:
- 使用SNS: ${form.sns.join('、')}
- 投稿頻度: ${form.frequency}
- フォロワー数: ${form.followers}
- 商品/サービス: ${form.hasProduct}
- 売上状況: ${form.salesStatus}
- 最大の問題: ${form.biggestProblem}
- 集客導線: ${form.hasFunnel}
- 1日の時間: ${form.timeAvailable}
- 自動化への興味: ${form.interestedInAutomation}

以下の5タイプから最も当てはまるものを1つ選んでください:
- 導線不足タイプ: フォロワーはいるのに売上に繋がらない（LINEなどの導線がない）
- 投稿迷子タイプ: 何を投稿すればいいか分からず、方向性が定まっていない
- 商品設計不足タイプ: SNSの運用以前に、商品・サービス自体の設計が弱い
- 継続困難タイプ: 時間や労力の問題で継続できていない
- 自動化未導入タイプ: 手作業で運用しており、仕組み化できていない

必ず以下のJSON形式のみで返答してください（他のテキストは含めないこと）:
{
  "type": "タイプ名（上記5タイプのうち1つ）",
  "cause": "このユーザーの売上に繋がりにくい原因（100〜150字）",
  "advice": "今すぐできる具体的なアドバイス1つ（80〜120字）",
  "next_step": "このまま放置するとどうなるか、改善の重要性（60〜80字）",
  "automation_pitch": "自動化によってどう変わるか（60〜80字）",
  "line_cta": "LINEへの誘導文（40〜60字）"
}`;

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      max_tokens: 800,
    });

    const raw = completion.choices[0].message.content ?? '{}';
    const result: DiagnosisResult = JSON.parse(raw);

    return Response.json(result);
  } catch (err: unknown) {
    console.error('API error:', err);
    const message = err instanceof Error ? err.message : String(err);
    return Response.json({ error: message }, { status: 500 });
  }
}
