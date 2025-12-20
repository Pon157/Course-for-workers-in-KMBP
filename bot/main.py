import asyncio
from aiogram import Bot, Dispatcher, types, F
from aiogram.filters import Command
from supabase import create_client, Client
import config

bot = Bot(token=config.BOT_TOKEN)
dp = Dispatcher()
supabase: Client = create_client(config.SUPABASE_URL, config.SUPABASE_KEY)

@dp.message(Command("start"))
async def start_handler(message: types.Message):
    # Приветствие и инструкция по привязке
    await message.answer(
        f"👋 Привет, {message.from_user.first_name}!\n"
        "Я бот обучающей платформы.\n\n"
        "Чтобы привязать аккаунт, введи на сайте этот ID в профиле: \n"
        f"<code>{message.from_user.id}</code>", 
        parse_mode="HTML"
    )

@dp.message(F.text.startswith("/help_curator"))
async def ask_curator(message: types.Message):
    # Логика связи с куратором
    user_id = message.from_user.id
    # Тут бот ищет в БД куратора, привязанного к этому пользователю
    # и пересылает ему сообщение
    await message.answer("Твой вопрос отправлен куратору. Ожидай ответа.")

async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
