# SkillFrame Frontend

Фронтенд-проект на базе Create React App + TypeScript для интеграции с бэкендом SkillFrame.

## Быстрый старт

1. Установите зависимости:
   ```bash
   npm install
   ```
2. Создайте файл `.env` (пример уже в репозитории) и укажите базовый URL API:
   ```bash
   REACT_APP_API_BASE_URL=http://localhost:8080
   ```
3. Запустите приложение в режиме разработки:
   ```bash
   npm start
   ```
   Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000).

## Технологический стек

- React 19 + TypeScript
- React Router v7
- Zustand (сохранение auth-состояния)
- @tanstack/react-query (работа с запросами)
- Axios (HTTP-клиент)
- Tailwind CSS (стили)
- i18next (локализация ru/kk/ja/en)

## Структура `src`

```
src/
  app/
    guards/        // Гварды маршрутов (RequireAuth, RequireRole)
    query/         // Настройка React Query
    router/        // Конфигурация маршрутизации
    store/         // Zustand-хранилища (auth, ui)
  components/
    layout/        // Sidebar, Topbar, AppLayout
    ui/            // Базовые UI-компоненты (Button, Input, Table, Modal)
  i18n/            // Настройка i18next и локализации
  pages/           // Страницы модулей (auth, dashboard, schedule, ...)
  services/
    api/           // Axios-инстанс и модули API (auth, users, ...)
    types/         // DTO (заглушки, требуют уточнения по бэкенду)
  styles/          // Tailwind-стили
```

## Таблица задействованных эндпоинтов (по текущей интеграции фронта)

| Модуль | Метод | Путь | Примечание |
| --- | --- | --- | --- |
| Auth | POST | `/auth/login` | Авторизация пользователя (нужна проверка DTO) |
| Auth | POST | `/auth/refresh` | TODO: подтвердить существование и контракт |
| Auth | POST | `/auth/logout` | TODO: подтвердить существование |
| Users | GET | `/users/me` | Загрузка профиля текущего пользователя |
| Users | GET | `/users` | Список пользователей (параметры требуют уточнения) |
| Users | POST | `/users` | Создание пользователя (контракт неизвестен) |
| Users | PUT | `/users/{id}` | Обновление пользователя |
| Users | DELETE | `/users/{id}` | Удаление пользователя |
| Schedule | GET | `/schedule` | Получение расписания |
| Schedule | GET | `/schedule/{id}` | Детали события |
| Schedule | POST | `/schedule` | Создание/редактирование (контракт не подтверждён) |
| Schedule | PUT | `/schedule/{id}` | Обновление |
| Schedule | DELETE | `/schedule/{id}` | Удаление |
| Attendance | GET | `/attendance` | Список отметок посещаемости |
| Attendance | PATCH | `/attendance/{id}` | Обновление статуса |
| Lessons | GET | `/lessons` | Список уроков |
| Lessons | GET | `/lessons/{id}` | Детали урока |
| Lessons | POST | `/lessons` | Создание урока (контракт не подтверждён) |
| Lessons | PUT | `/lessons/{id}` | Обновление |
| Grades | GET | `/grades` | Журнал оценок |
| Grades | PUT | `/grades/{id}` | Обновление оценки |
| Reports | GET | `/reports` | Список доступных отчётов |
| Reports | GET | `/reports/{id}/export` | Выгрузка отчёта (формат уточнить) |

> ⚠️ Из-за отсутствия доступа к бэкенду все контракты требуют подтверждения. В коде оставлены TODO, которые нужно актуализировать после получения спецификации/Swagger.

## Что дальше

- Получить доступ к бэкенду и обновить `BACKEND_AUDIT.md` фактическими данными.
- Сгенерировать типы и полноценный клиент из OpenAPI (или вручную на основе DTO бэкенда).
- Реализовать обработку `refresh`-токена и уведомлений об ошибках (тоасты).
- Наполнить страницы формами/модалами для CRUD-операций по фактическим API.
- Добавить тесты и визуальные регрессии после стабилизации контрактов.

