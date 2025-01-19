import { NextResponse } from 'next/server'

const QIANWEN_API_KEY = process.env.QIANWEN_API_KEY
const QIANWEN_API_URL = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation'

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()
    
    const response = await fetch(QIANWEN_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${QIANWEN_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'qwen-turbo',
        input: {
          messages: messages.map((msg: any) => ({
            role: msg.role,
            content: msg.content,
          })),
        },
      }),
    })

    if (!response.ok) {
      throw new Error('通义千问 API 调用失败')
    }

    const data = await response.json()
    return NextResponse.json({ response: data.output.text })
    
  } catch (error) {
    console.error('API错误:', error)
    return NextResponse.json(
      { error: '处理请求时发生错误' },
      { status: 500 }
    )
  }
} 