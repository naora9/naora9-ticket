"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Ticket,
  ShieldCheck,
  AlertTriangle,
  MapPin,
  CalendarDays,
  MessageCircle,
  HeartHandshake,
  CircleDollarSign,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PostStatus = "거래가능" | "예약중";

type Post = {
  id: number;
  title: string;
  date: string;
  seat: string;
  price: number;
  seller: string;
  location: string;
  method: string;
  detail: string;
  status: PostStatus;
};

type FormState = {
  title: string;
  date: string;
  seat: string;
  price: string;
  seller: string;
  location: string;
  method: string;
  detail: string;
};

const initialPosts: Post[] = [
  {
    id: 1,
    title: "4/28 사직 롯데 vs 두산 2연석 양도",
    date: "2026-04-28",
    seat: "중앙탁자석 2연석",
    price: 36000,
    seller: "나오라구팬1",
    location: "사직야구장",
    method: "직거래",
    detail: "정가 그대로 양도합니다. 경기 시작 1시간 전 현장 거래 가능해요.",
    status: "거래가능",
  },
  {
    id: 2,
    title: "5/1 홈경기 응원석 1매",
    date: "2026-05-01",
    seat: "내야필드석 1매",
    price: 22000,
    seller: "롯데뿐이다",
    location: "사직야구장",
    method: "모바일전달",
    detail: "개인 사정으로 못 가게 되어 정가 양도합니다.",
    status: "예약중",
  },
  {
    id: 3,
    title: "5/3 사직 3루 단석 양도",
    date: "2026-05-03",
    seat: "3루 단석",
    price: 17000,
    seller: "부산갈매기",
    location: "사직야구장",
    method: "모바일전달",
    detail: "캡처본 거래 X, 예매내역 확인 후 진행합니다.",
    status: "거래가능",
  },
];

const currency = (value: number): string =>
  new Intl.NumberFormat("ko-KR").format(value) + "원";

function StatCard({
  icon: Icon,
  title,
  value,
  sub,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  sub: string;
}) {
  return (
    <Card className="rounded-2xl border-0 bg-white/90 shadow-sm backdrop-blur">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-zinc-500">{title}</p>
            <h3 className="mt-1 text-2xl font-bold text-zinc-900">{value}</h3>
            <p className="mt-1 text-xs text-zinc-500">{sub}</p>
          </div>
          <div className="rounded-2xl bg-red-50 p-3">
            <Icon className="h-5 w-5 text-red-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PostCard({
  post,
  onToggleFavorite,
}: {
  post: Post;
  onToggleFavorite: (id: number) => void;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="rounded-2xl border-zinc-200 shadow-sm transition-shadow hover:shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <CardTitle className="text-lg text-zinc-900">
                  {post.title}
                </CardTitle>
                <Badge
                  className={
                    post.status === "거래가능"
                      ? "bg-green-100 text-green-700 hover:bg-green-100"
                      : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                  }
                >
                  {post.status}
                </Badge>
              </div>
              <p className="mt-2 text-sm text-zinc-500">판매자 · {post.seller}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl"
              onClick={() => onToggleFavorite(post.id)}
            >
              <HeartHandshake className="mr-1 h-4 w-4" />
              관심
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2 text-sm text-zinc-700 sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-zinc-400" />
              {post.date}
            </div>
            <div className="flex items-center gap-2">
              <Ticket className="h-4 w-4 text-zinc-400" />
              {post.seat}
            </div>
            <div className="flex items-center gap-2">
              <CircleDollarSign className="h-4 w-4 text-zinc-400" />
              {currency(post.price)}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-zinc-400" />
              {post.location}
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-zinc-400" />
              {post.method}
            </div>
          </div>

          <div className="rounded-xl bg-zinc-50 p-4 text-sm leading-relaxed text-zinc-700">
            {post.detail}
          </div>

          <div className="flex gap-2">
           <Button
  className="rounded-xl bg-red-600 hover:bg-red-700"
  onClick={() => window.open("https://www.instagram.com/naora9/", "_blank")}
>
  인스타 DM 문의
</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Naora9LotteTicketSite() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [form, setForm] = useState<FormState>({
    title: "",
    date: "",
    seat: "",
    price: "",
    seller: "",
    location: "사직야구장",
    method: "직거래",
    detail: "",
  });

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        post.title.toLowerCase().includes(keyword) ||
        post.seat.toLowerCase().includes(keyword) ||
        post.seller.toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "all" ? true : post.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [posts, search, statusFilter]);

  const availableCount = posts.filter((p) => p.status === "거래가능").length;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !form.title ||
      !form.date ||
      !form.seat ||
      !form.price ||
      !form.seller
    ) {
      return;
    }

    const newPost: Post = {
      id: Date.now(),
      title: form.title,
      date: form.date,
      seat: form.seat,
      price: Number(form.price),
      seller: form.seller,
      location: form.location,
      method: form.method,
      detail: form.detail,
      status: "거래가능",
    };

    setPosts((prev) => [newPost, ...prev]);
    setForm({
      title: "",
      date: "",
      seat: "",
      price: "",
      seller: "",
      location: "사직야구장",
      method: "직거래",
      detail: "",
    });
  };

  const handleToggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-zinc-50 text-zinc-900">
      <section className="relative overflow-hidden border-b bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <Badge className="mb-4 rounded-full bg-red-100 px-4 py-1 text-red-700 hover:bg-red-100">
              naora9 x 롯데팬 정가양도 플랫폼
            </Badge>

            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
              나오라구와 함께하는
              <br />
              롯데팬 티켓 정가양도 사이트
            </h1>

            <p className="mt-5 text-base leading-7 text-zinc-600 sm:text-lg">
              암표 없이, 웃돈 없이, 진짜 롯데팬끼리 안전하게.
              사직으로 가는 한 장의 티켓을 정가로 연결하는 팬 커뮤니티입니다.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
  className="rounded-2xl bg-red-600 px-6 hover:bg-red-700"
  onClick={() => {
    document.getElementById("register-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }}
>
  양도글 등록하기
</Button>
              <Button variant="outline" className="rounded-2xl px-6">
                거래 수칙 보기
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="grid gap-4 md:grid-cols-3">
          <StatCard
            icon={Ticket}
            title="현재 등록 티켓"
            value={`${posts.length}건`}
            sub="실시간 양도글 기준"
          />
          <StatCard
            icon={ShieldCheck}
            title="거래 가능"
            value={`${availableCount}건`}
            sub="정가 양도 진행 가능"
          />
          <StatCard
            icon={HeartHandshake}
            title="관심 등록"
            value={`${favorites.length}건`}
            sub="내가 찜한 게시글"
          />
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-6">
            <Card id="register-form" className="rounded-2xl shadow-sm">
              <CardContent className="p-5">
                <div className="grid gap-3 md:grid-cols-[1fr,180px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                    <Input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="날짜, 좌석, 판매자 검색"
                      className="rounded-xl pl-9"
                    />
                  </div>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="거래 상태" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="거래가능">거래가능</SelectItem>
                      <SelectItem value="예약중">예약중</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}

              {filteredPosts.length === 0 && (
                <Card className="rounded-2xl border-dashed shadow-sm">
                  <CardContent className="flex min-h-[180px] items-center justify-center text-zinc-500">
                    검색 조건에 맞는 양도글이 없습니다.
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">양도글 등록</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="예: 5/5 사직 중앙석 2연석 양도"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    className="rounded-xl"
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      type="date"
                      value={form.date}
                      onChange={(e) =>
                        setForm({ ...form, date: e.target.value })
                      }
                      className="rounded-xl"
                    />
                    <Input
                      placeholder="좌석 정보"
                      value={form.seat}
                      onChange={(e) =>
                        setForm({ ...form, seat: e.target.value })
                      }
                      className="rounded-xl"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      type="number"
                      placeholder="정가 금액"
                      value={form.price}
                      onChange={(e) =>
                        setForm({ ...form, price: e.target.value })
                      }
                      className="rounded-xl"
                    />
                    <Input
                      placeholder="판매자 닉네임"
                      value={form.seller}
                      onChange={(e) =>
                        setForm({ ...form, seller: e.target.value })
                      }
                      className="rounded-xl"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Select
                      value={form.location}
                      onValueChange={(value) =>
                        setForm({ ...form, location: value })
                      }
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="장소" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="사직야구장">사직야구장</SelectItem>
                        <SelectItem value="원정경기">원정경기</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={form.method}
                      onValueChange={(value) =>
                        setForm({ ...form, method: value })
                      }
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="양도 방식" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="직거래">직거래</SelectItem>
                        <SelectItem value="모바일전달">모바일전달</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Textarea
                    placeholder="거래 안내, 인증 가능 여부, 유의사항 등을 적어주세요"
                    value={form.detail}
                    onChange={(e) =>
                      setForm({ ...form, detail: e.target.value })
                    }
                    className="min-h-[120px] rounded-xl"
                  />

                  <Button
                    type="submit"
                    className="w-full rounded-xl bg-red-600 hover:bg-red-700"
                  >
                    등록하기
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-amber-200 bg-amber-50/60 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl text-amber-900">
                  <AlertTriangle className="h-5 w-5" />
                  안전 거래 수칙
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-6 text-amber-950">
                <p>• 반드시 정가 기준으로만 양도하세요.</p>
                <p>• 예매 내역, 좌석 정보, 본인 확인이 가능한 범위에서 인증하세요.</p>
                <p>• 캡처본 선전송, 과도한 선입금 요구 거래는 피하세요.</p>
                <p>• 커뮤니티 외부 유도 및 웃돈 거래 제안은 즉시 신고하세요.</p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">운영 방향</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-6 text-zinc-700">
                <p>
                  이 사이트는 나오라구와 롯데팬들이 함께 만드는 팬 중심 정가양도
                  커뮤니티를 목표로 합니다.
                </p>
                <p>
                  추후 기능으로는 본인인증, 신고 시스템, 거래완료 처리, 경기별
                  필터, 좌석 지도, 관리자 승인 기능을 붙일 수 있습니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white/90">
        <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-zinc-500 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 나오라구 x 롯데팬 티켓 정가양도</p>
            <p>암표 없는 건강한 직관 문화를 응원합니다.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}