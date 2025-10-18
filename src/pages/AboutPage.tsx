import { useMemo } from 'react';
import { useAppSelector } from '../store/hooks';

const AboutPage = () => {
  const theme = useAppSelector((state) => state.theme.mode);
  const isLight = theme === 'light';

const mockLines = useMemo(
  () => [
    "/* ──────────────────────────────────────────────",
    " * Abuto.ts — personal meta",
    " * author : Pachara Sesangngam",
    " * ────────────────────────────────────────────── */",
    "",
    "type AbutoProfile = {",
    "  name: string;",
    "  studentId: string;",
    "  stack: string[];",
    "};",
    "",
    "export const Abuto: AbutoProfile = {",
    "  name: 'Pachara Sesangngam',",
    "  studentId: '1660706126',",
    "  stack: ['React','TypeScript','Redux Toolkit','Tailwind','Daisy UI'],",
    "  }",
    "} as const;",
    "",
    "// usage",
    "const books = useBooks();",
    "const [collection, toggle] = useCollection();",
    "return books.map(b => (",
    "  <BookCard",
    "    key={b.id}",
    "    book={b}",
    "    isSaved={collection.includes(b.id)}",
    "    onToggle={() => toggle(b)}",
    "  />",
    "));",
  ],
  [],
);

  return (
    <section
      className={`w-full py-10 ${
        isLight ? 'text-neutral-900' : 'text-white'
      }`}
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr),minmax(0,420px)]">
        <div>
          <h1 className="text-3xl font-bold">เกี่ยวกับผู้พัฒนา</h1>
          <div className={`mt-6 space-y-4 ${isLight ? 'text-neutral-600' : 'text-zinc-300'}`}>
            <p>
              เว็บไซต์ BookHaven เป็นเว็บที่สร้างขึ้นด้วย React และ TypeScript โดยใช้ข้อมูล Api จาก Open Library เพื่อแสดงรายการหนังสือต่างๆ
            </p>
            <p>
             เราสามารถบันทึก หนังสือที่สนใจไว้ในคอลเลกชันส่วนตัวได้ ข้อมูลทั้งหมดจะถูกเก็บไว้ใน local storage
            </p>
            <p>
             เเละมีการเรียงลำดับหนังสือตามปีที่พิมพ์ได้อ
            </p>
          </div>
        </div>

        <div
          className={`overflow-hidden rounded-xl border shadow-lg transition-colors duration-300 ${
            isLight
              ? 'border-neutral-200 bg-white'
              : 'border-zinc-700 bg-black/60'
          }`}
        >
          <div
            className={`border-b px-4 py-2 text-sm font-medium ${
              isLight ? 'border-neutral-200 text-neutral-500' : 'border-zinc-700 text-zinc-400'
            }`}
          >
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-red-400" />
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-amber-300" />
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400" />
            mockup.tsx
          </div>
          <pre
            className={`overflow-auto px-4 py-4 text-sm leading-6 ${
              isLight ? 'bg-neutral-50 text-neutral-800' : 'bg-black/70 text-zinc-200'
            }`}
          >
            <code>
              {mockLines.map((line, index) => (
                <span key={line} className="block">
                  <span className="mr-3 inline-block w-5 text-right text-xs opacity-40">
                    {index + 1}
                  </span>
                  {line}
                </span>
              ))}
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
