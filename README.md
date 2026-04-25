# Users Dashboard

Небольшой дашборд по пользователям из открытого API DummyJSON. Делал как тестовое
задание, постарался чтобы было аккуратно по архитектуре и при этом без оверинжиниринга.

API: https://dummyjson.com/users
Доки: https://dummyjson.com/docs/users

## Что внутри умеет делать

- Список пользователей с серверной пагинацией (12 / 24 / 48 на страницу).
- Поиск по имени/почте/компании (с дебаунсом, чтобы не дёргать апи на каждый символ).
- Фильтр по полу (мужской/женский/все).
- Сортировка по имени, фамилии, возрасту и email с переключением порядка.
- Два режима отображения — сетка и список.
- Страница пользователя с подробной карточкой (контакты, личные данные, работа и
  университет).
- Скелетоны во время загрузки, нормальный empty state, обработка ошибок с кнопкой
  «повторить».
- Адаптивная вёрстка — норм работает и на телефоне и на десктопе.

## Стек и почему так

- **React 19 + TypeScript + Vite** — быстрый старт, минимум магии, hot reload летает.
- **TanStack Query** — потому что это лучше всего подходит для серверного состояния.
  Кэш, дедупликация, отмена запросов через AbortSignal, `keepPreviousData` чтобы при
  смене страницы старый список не моргал — всё это из коробки. Не люблю писать
  `useEffect` с ручным fetch, это ад.
- **Zustand** — небольшой стор только для UI-состояния списка (поиск, фильтры,
  сортировка, страница, режим просмотра). Не Redux потому что тут просто незачем,
  Zustand даёт ровно столько сколько надо и без бойлерплейта.
- **React Router v7** — роутинг между списком и деталями.
- **Tailwind CSS v4** — стилизация. Новый `@tailwindcss/vite` плагин, `@theme` блок
  прямо в css, никаких отдельных конфигов и постcss не нужно, очень удобно.
- **lucide-react** — иконки, чистый SVG, без лишнего веса.

## Архитектура — Feature-Sliced Design (FSD)

Решил взять FSD потому что он хорошо подходит как раз для такого кейса где есть
сущность, фичи которые с ней работают, и страницы которые их собирают. Слои строго
сверху-вниз могут импортировать только нижние, поэтому не получится случайно сделать
кольцевую зависимость.

```
src/
├── app/         — composition root: провайдеры (QueryClient), роутер, layout, стили
├── pages/       — страницы (users-list, user-details, not-found)
├── widgets/     — composite-блоки: users-toolbar, users-grid, user-details, app-header
├── features/    — пользовательские фичи: users-list-controls (поиск/фильтр/сортировка/
│                  view-toggle/page-size), pagination
├── entities/    — бизнес-сущности: user (types, api, queries, ui компоненты)
└── shared/      — переиспользуемое: api-клиент, ui-кит, утилиты, конфиг
```

## Запуск

Нужен Node 20+ (я тестил на 25) и pnpm (можно npm/yarn — скрипты те же).

```bash
pnpm install
pnpm dev      # http://localhost:5173
pnpm build    # production-сборка в dist/
pnpm preview  # запустить собранный билд локально
```

## Скриншоты

- `docs/screenshot-list.png` — список пользователей в режиме сетки
- `docs/screenshot-details.png` — страница пользователя

## Структура файлов покороче

Главные точки:

- [src/main.tsx](src/main.tsx) — bootstrap.
- [src/app/app.tsx](src/app/app.tsx) — корень приложения с провайдером Query.
- [src/app/router/router.tsx](src/app/router/router.tsx) — конфиг роутов.
- [src/entities/user/api/users.api.ts](src/entities/user/api/users.api.ts) — методы
  обращения к DummyJSON, с правильным выбором эндпоинта для search/filter/list.
- [src/widgets/users-grid/lib/use-users-list.ts](src/widgets/users-grid/lib/use-users-list.ts)
  — хук который собирает параметры из стора и дергает react-query.
- [src/features/users-list-controls/model/store.ts](src/features/users-list-controls/model/store.ts)
  — стор со всем UI-состоянием списка.

Спасибо что посмотрели.
