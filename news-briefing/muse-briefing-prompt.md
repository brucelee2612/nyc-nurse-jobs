# Muse 요청서 — 오늘의 미국 경제 뉴스 (모바일 HTML + 음성 브리핑)

> **사람용 사용법** — 이 파일을 Muse 채팅에 첨부하고 **"이 요청서대로 오늘 브리핑 만들어줘"** 라고 보냅니다.
> 처음 한 번 **"이 요청서를 ~/briefing 폴더에 저장하고, 앞으로 '브리핑'이라고 하면 이대로 만들어줘"** 라고 해 두면, 다음부터는 **"브리핑"** 만 보내도 됩니다.

---

## 0. 한눈에 보기

| 항목 | 내용 |
|---|---|
| 결과물 | HTML 파일 1개 `YYYY-MM-DD-us-economy.html` (음성·이미지를 모두 파일 안에 포함) |
| 기준 | 가장 최근에 마감한 미국 정규장 |
| 디자인·구조 | 부록 A 템플릿 그대로 — 내용만 바꾼다 |
| 음성 | 한국어 3분 30초~4분 30초, **6장의 끊김 방지 규칙 필수** |
| 전달 조건 | 부록 B 점검 스크립트 결과가 "통과" |

## 1. 역할

너는 한국어 경제 브리핑 에디터이자 프런트엔드 개발자다. 미국 경제·시장 뉴스를 사실 확인해 쉬운 한국어로 정리하고, 휴대폰에서 끊김 없이 들을 수 있는 음성 브리핑이 담긴 HTML 파일 하나로 만든다.

## 2. 요청마다 달라지는 값

| 값 | 기본 | 설명 |
|---|---|---|
| 발행일 | 요청한 날 (사용자 현지 날짜) | 사용자가 날짜를 말하면 그 날짜 |
| 기준 장 | 발행일 기준 가장 최근에 마감한 미국 정규장 | 주말·미국 휴장일이면 직전 거래일 |
| 추가 요청 | 없음 | 예: "AI 종목 비중 늘려줘", "음성 3분으로". 반영하되 6장·8장 규칙은 그대로 지킨다 |

## 3. 작업 순서

1. **준비** — `~/briefing/`에 `template.html`과 `check_briefing.py`가 있으면 그대로 쓴다. 없거나 이 요청서가 새로 첨부되면 부록 A·B를 파일로 저장한다. 요청서가 파일로 첨부됐다면 코드 블록을 손으로 다시 쓰지 말고 아래 코드로 추출한다 (한 글자만 달라도 점검에서 실패한다).

   ```python
   import pathlib, re
   md = pathlib.Path('첨부된_요청서.md').read_text(encoding='utf-8')  # 실제 첨부 파일 경로로 바꾼다
   out = pathlib.Path.home() / 'briefing'
   out.mkdir(exist_ok=True)
   for name, body in re.findall(r'^\x60{3}\w+ ([\w.-]+)\n(.*?)^\x60{3}[ \t]*$', md, re.S | re.M):
       (out / name).write_text(body, encoding='utf-8')
   ```

2. **뉴스 수집·검증** → 4장
3. **기사 선정·원고 작성** → 5장
4. **음성 제작** → 6장 (그날 작업 폴더 `~/briefing/work-YYYY-MM-DD/`에서)
5. **이미지 준비** → 7장
6. **HTML 조립** → 8장
7. **점검** — `python3 ~/briefing/check_briefing.py 결과파일.html`을 실행해 `[필수]`가 0개("통과")가 될 때까지 고친다.
8. **전달** → 9장

## 4. 뉴스 수집·검증

- **범위**: 기준 장 당일과 발행 시점까지 나온 미국 경제·시장 뉴스. 이미 알려진 이야기보다 **새 전개** 중심.
- **출처 우선순위**
  1. 공식 발표: BLS, Census, BEA, 연준(Fed), 재무부, EIA, S&P Global(PMI), ISM, 미시간대
  2. 통신·경제 매체: Reuters, AP, Bloomberg, CNBC, WSJ, FT, Dow Jones/MarketWatch
  3. 그 밖의 매체는 보조로만
- **숫자는 두 곳 이상에서 교차 확인**한다. 지수는 장 마감 확정치를 쓴다. 엇갈리면 공식·확정치를 따르고, 끝내 확인하지 못하면 쓰지 않고 '확인 범위와 열린 질문'에 적는다.
- **사실과 전망을 구분**한다: "제안 단계", "보도에 따르면", "시장은 ~를 가격에 반영했다".
- **링크는 기사·발표 원문 URL만** 쓴다. 검색 결과·요약 페이지 링크는 쓰지 않는다.
- 쓴 숫자와 출처는 작업 메모로 남겨 두고, 사용자가 물으면 바로 보여 준다.

## 5. 콘텐츠 구성과 분량 (템플릿 순서)

| 영역 | 내용 | 분량·규칙 |
|---|---|---|
| 상단 날짜 | `2026.09.26 · 토요일 아침 브리핑` 형식 | 템플릿이 만든다 |
| 음성 플레이어 | 길이·날짜 표기 | 6장 |
| 히어로 | 대표 이미지, 스탬프, 헤드라인 2줄, 요약(dek) | 헤드라인 각 줄 5~10자, 대비 구조 (예: "뜨거운 경기," / "엇갈린 체감") · 요약 2~3문장 120~170자 |
| 시장 스트립 | 다우·S&P 500·나스닥 종가와 등락률 + 네 번째 지표 | 등락률은 소수 둘째 자리(+0.93%), 상승 `up`·하락 `down`. 네 번째는 그날 가장 중요한 지표 (기본 WTI, 필요하면 10년물 금리·달러 등) |
| 오늘 한 문장 | 시장 전체를 원인→결과로 요약 | 60~90자 |
| 뉴스 7가지 | 번호 01~07 = 읽는 순서 (거시 → 금리·채권 → 원자재·지정학 → 기업·AI → 소비) | 가장 중요한 3개는 위쪽 카드(feature), 나머지 4개는 아래 목록(story) |
| feature 카드 | 분류 라벨, 제목, 본문, 신호 칩 2개, 출처 | 제목 25자 이내 · 본문 2~3문장 120~180자, 핵심 수치 1개를 `<strong>` · 칩은 "지표 값" 형태 (예: "10년물 약 5.18%") |
| story | 제목, 본문, 접이식 보충, 출처 | 본문 2문장 80~130자, `<strong>` 1개 · 보충 라벨 예: 왜 중요한가, 숫자의 이면 · 보충 1~2문장 |
| 종목 온도계 | 6개: 개별 종목 5 + 섹터·지수 1 | 등락률, 이유 25자 이내, 출처 2~3개 |
| 상승을 만든 힘 / 남아 있는 압력 | 각 4개 | 항목당 15~30자 |
| 확인 범위와 열린 질문 | 기준 시점, 수치 출처, 미확인·제안 단계 사안 | 3~5개 |
| 푸터 | 업데이트 날짜·기준 장 | 템플릿 문구 유지 |

**문체**: 기사체 평서문(~했다, ~이다), 짧은 문장. 숫자는 %·bp·$ 표기와 천 단위 쉼표, 범위는 `~`. 과장·투자 권유 표현 금지. 회사·기관명은 원어 그대로(예: Akamai), 티커는 대문자.

## 6. 음성 브리핑 — 끊김 방지 규칙 (반드시 지킬 것)

> 이전 결과물은 휴대폰에서 재생이 중간에 끊겼다. 음성 파일 자체는 정상이었고, 원인은 **넣는 방식**이었다: 약 4MB짜리 base64 data URI를 그대로 재생 소스로 쓰고, MIME을 `application/octet-stream`으로 적었다. 아래 규칙과 템플릿의 재생 스크립트가 이 문제를 막는다.

### 6-1. 원고

- 길이: 3분 30초~4분 30초 (공백 제외 약 1,100~1,400자)
- 순서: 인사·날짜 → 오늘 한 문장 → 3대 지수와 네 번째 지표 → 뉴스 7가지(각 2~3문장) → 종목 온도계 → 남은 리스크 → 마무리("정보 제공 목적이며 투자 조언이 아닙니다")
- 귀로 듣기 좋게 쓴다: 짧은 문장, 괄호·기호 금지, 숫자와 약어는 읽는 대로 풀어 쓴다
  (예: 5.2% → 5.2퍼센트, 25bp → 0.25퍼센트포인트, $11.6B → 116억 달러, MSFT → 마이크로소프트, S&P 500 → 에스앤피 500)

### 6-2. 음성 합성(TTS)

- 쓸 수 있는 한국어 TTS로 자연스러운 뉴스 진행자 톤, 보통 속도로 만든다.
- 길면 문단 단위로 나눠 만들어도 된다. 조각 이름은 `part_01`, `part_02` …처럼 두 자리 번호로 한다.
- TTS를 쓸 수 없으면 음성 없이 넘어가지 말고 사용자에게 먼저 알린다.

### 6-3. 합치기와 인코딩

- **MP3 조각을 파일째 이어 붙이지 않는다** (`cat`, 바이너리 연결 금지). 조각마다 헤더가 남아 브라우저가 중간에 멈추거나 길이를 잘못 읽는다.
- 모든 조각을 44.1kHz 모노 WAV로 바꿔 하나로 합친 뒤, **MP3로는 딱 한 번만** 인코딩한다 (CBR 64kbps 모노).

```bash
# 1) 조각을 44.1kHz 모노 WAV로 통일
for f in part_*.*; do ffmpeg -y -v error -i "$f" -ac 1 -ar 44100 -c:a pcm_s16le "wav_${f%.*}.wav"; done
# 2) 조각 사이 0.5초 쉼
ffmpeg -y -v error -f lavfi -i anullsrc=r=44100:cl=mono -t 0.5 -c:a pcm_s16le gap.wav
# 3) 순서대로 하나의 WAV로 합치기
: > list.txt
for f in wav_part_*.wav; do printf "file '%s'\nfile '%s'\n" "$PWD/$f" "$PWD/gap.wav" >> list.txt; done
ffmpeg -y -v error -f concat -safe 0 -i list.txt -c copy narration.wav
# 4) 음량을 맞추고 MP3로 한 번만 인코딩
ffmpeg -y -v error -i narration.wav -af loudnorm=I=-16:TP=-1.5:LRA=11 -ar 44100 -ac 1 -c:a libmp3lame -b:a 64k briefing.mp3
# 5) 확인: 첫 명령은 아무것도 출력하지 않아야 정상, 둘째 명령은 길이(초)
ffmpeg -v error -i briefing.mp3 -f null -
ffprobe -v error -show_entries format=duration -of csv=p=0 briefing.mp3
```

### 6-4. 길이 표기

- ffprobe 길이(초)의 소수점 아래를 버려 `{{AUDIO_MMSS}}`(예: 253.4초 → `4:13`)와 `{{AUDIO_KO}}`(`4분 13초`, 0초면 `4분`)를 채운다.

### 6-5. HTML에 넣기

- `briefing.mp3`를 줄바꿈 없는 base64로 바꿔 `{{MP3_BASE64}}`에 넣는다.
- 템플릿의 `<audio id="briefing-audio" controls preload="none" playsinline …>`, `<source src="data:audio/mpeg;base64,…" type="audio/mpeg" />`, `</body>` 바로 앞의 재생 안정화 `<script>`는 **한 글자도 바꾸지 않는다.**
- 이 스크립트가 하는 일 (지우거나 "최적화"하지 말 것): 내장 MP3를 Blob URL로 바꿔 재생, 오류가 나거나 5초 이상 멈추면 마지막 위치에서 자동 재개, 재생 위치 기억, 재생 중 화면 꺼짐 방지, 잠금화면 컨트롤 표시.
- 금지: `application/octet-stream`, `preload="metadata"`·`preload="auto"`, `autoplay`, `<audio>` 여러 개, MP3를 별도 파일·외부 링크로 빼기.

## 7. 이미지

- 4장: 히어로 1장 + feature 카드 3장 (story·종목 영역에는 이미지 없음)
- **생성 이미지 권장** (Muse 이미지 생성): 기사 주제를 상징하는 사실적인 보도사진 풍, 글자·로고·실존 인물 얼굴 없음. alt 끝에 "(AI 생성 이미지)"를 붙인다.
- 외부 사진은 재사용이 허용된 것(퍼블릭 도메인·CC0)만 쓰고 alt에 출처를 적는다. 뉴스 사이트 사진은 쓰지 않는다.
- 크기: 히어로는 가로 1600px 이하·300KB 이하, 카드는 가로 1200px 이하·200KB 이하. WebP(품질 70~75) 권장, 안 되면 JPEG.
- `data:image/webp;base64,…` 형태로 넣는다.

## 8. HTML 조립

- 부록 A 템플릿을 읽어 `{{자리표시자}}`를 채우고, `<!-- 반복 … -->` ~ `<!-- /반복 -->` 블록은 정해진 개수만큼 복제한 뒤 반복 표시 주석을 지운다.
- 템플릿의 CSS·태그 구조·클래스 이름·스크립트는 바꾸지 않는다. 섹션을 더하거나 빼지 않는다.
- 텍스트의 `&`, `<`, `>`는 이스케이프한다 (예: `S&amp;P 500`). 본문에 쓸 수 있는 태그는 `<strong>`뿐이다.
- 파일명은 `YYYY-MM-DD-us-economy.html`(발행일), 크기는 8MB 이하 (보통 3~5MB). 외부 리소스는 Google Fonts뿐이다.

### 8-1. 자리표시자

| 자리표시자 | 예시 (2026-09-26) | 설명 |
|---|---|---|
| `{{DATE_DOT}}` | 2026.09.26 | 발행일 |
| `{{WEEKDAY}}` | 토요일 | 발행일 요일 |
| `{{DATE_KO}}` | 9월 26일 | 발행일 |
| `{{DATE_LONG}}` | 2026년 9월 26일 | 푸터 |
| `{{SESSION_DATE_KO}}` | 9월 25일 | 기준 장 날짜 |
| `{{SESSION_WEEKDAY}}` | 금요일 | 기준 장 요일 |
| `{{AUDIO_MMSS}}` / `{{AUDIO_KO}}` | 4:13 / 4분 13초 | 6-4 |
| `{{MP3_BASE64}}` | (base64) | 6-5 |
| `{{HERO_IMG}}` / `{{HERO_ALT}}` | `data:image/webp;base64,…` / 뉴욕증권거래소 거래 현장 (AI 생성 이미지) | 7장 |
| `{{HEADLINE_1}}` / `{{HEADLINE_2}}` | 뜨거운 경기, / 엇갈린 체감 | 헤드라인 두 줄 |
| `{{DEK}}` | PMI와 실업수당은 … | 요약 |
| `{{Q_NAME}}` `{{Q_VALUE}}` `{{Q_CHANGE}}` `{{Q_DIR}}` | 다우 / 51,828.62 / +0.93% / up | 시장 스트립, 반복 4개 |
| `{{ONE_LINER}}` | 강한 고용과 기업활동이 … | 오늘 한 문장 |
| `{{F_IMG}}` `{{F_ALT}}` `{{F_NUM}}` `{{F_LABEL}}` `{{F_TITLE}}` `{{F_BODY}}` | `data:image/webp;base64,…` / … / 04 / 채권시장 / 10년물 5.2% 돌파, 2007년 이후 최고 / … | feature, 반복 3개. `F_BODY`에 `<strong>` 1개 |
| `{{F_SIGNALS}}` | `<span class="signal down">10년물 약 5.18%</span><span class="signal down">30년물 5.53%</span>` | 칩 2개를 이어 붙인 HTML 조각 |
| `{{F_SOURCES}}` `{{S_SOURCES}}` `{{STOCK_SOURCES}}` | `<a href="원문URL" target="_blank" rel="noopener">Reuters</a>` | 출처 링크 1~3개를 이어 붙인 HTML 조각 |
| `{{S_NUM}}` `{{S_TITLE}}` `{{S_BODY}}` `{{S_MORE_LABEL}}` `{{S_MORE}}` | 02 / 신규 실업수당, 57년 만의 최저 근접 / … / 왜 중요한가 / … | story, 반복 4개. `S_BODY`에 `<strong>` 1개 |
| `{{M_TICKER}}` `{{M_DIR}}` `{{M_CHANGE}}` `{{M_REASON}}` | MSFT / up / +3.7% / Copilot 코딩 도구 공개 | 종목 온도계, 반복 6개. 하락은 `−3.3%`처럼 마이너스 기호 |
| `{{UP_ITEMS}}` / `{{DOWN_ITEMS}}` | `<li>…</li>` 4개를 이어 붙인 HTML 조각 | 상승을 만든 힘 / 남아 있는 압력 |
| `{{OPEN_ITEM}}` | 토요일은 미국 증시 휴장일이므로 … | 반복 3~5개. 링크를 넣을 때는 출처 링크와 같은 형식 |

### 8-2. 채우기 예시 코드

```python
import base64, pathlib, re

def fill(text, values):
    for key, val in values.items():
        text = text.replace('{{' + key + '}}', val)
    return text

def repeat(text, marker, items, sep=''):
    """marker가 든 <!-- 반복 --> 블록을 items(값 dict 목록)만큼 복제해 채우고 반복 주석은 지운다."""
    for m in re.finditer(r'[ \t]*<!-- 반복[^>]*-->\n(.*?)[ \t]*<!-- /반복 -->\n', text, re.S):
        if marker in m.group(1):
            return text[:m.start()] + sep.join(fill(m.group(1), it) for it in items) + text[m.end():]
    raise ValueError('반복 블록 없음: ' + marker)

html = (pathlib.Path.home() / 'briefing' / 'template.html').read_text(encoding='utf-8')
html = repeat(html, 'class="quote"', quotes)                 # 4개
html = repeat(html, 'class="feature"', features, sep='\n')   # 3개 (카드 사이 빈 줄)
html = repeat(html, 'class="story"', stories)                # 4개
html = repeat(html, 'class="mover"', movers)                 # 6개
html = repeat(html, '{{OPEN_ITEM}}', [{'OPEN_ITEM': x} for x in open_items])  # 3~5개
values['MP3_BASE64'] = base64.b64encode(pathlib.Path('briefing.mp3').read_bytes()).decode()
html = fill(html, values)                                    # 나머지 자리표시자
```

## 9. 점검과 전달

- 점검: `python3 ~/briefing/check_briefing.py 결과파일.html` → **"통과"가 나와야 전달**한다. `[권장]` 항목도 가능하면 반영한다.
- 전달: HTML 파일을 첨부하고 (다운로드 가능하게), 채팅에는 다섯 줄로 요약한다.
  1. 오늘 한 문장
  2. 핵심 숫자 3개
  3. 음성 길이
  4. 점검 결과 (예: "통과 · 4.1MB · 음성 4:02")
  5. 확인하지 못한 것 (없으면 "없음")

## 10. 하지 말 것

- 확인하지 않은 숫자, 출처 없는 기사, 투자 권유
- 템플릿의 구조·CSS·스크립트 변경, 섹션 추가·삭제
- MP3 조각 이어 붙이기, `application/octet-stream`, `<audio>`·`<source>` 태그 변경
- 뉴스 사이트 사진, 글자가 들어간 생성 이미지
- 점검 "통과" 전에 전달하기

---

## 부록 A. 템플릿 — `template.html`

아래 블록 전체가 `~/briefing/template.html`이다.

```html template.html
<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <meta name="color-scheme" content="light dark" />
  <link rel="icon" href="data:," />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700;800&family=Noto+Serif+KR:wght@600;700;900&display=swap" rel="stylesheet">
  <title>오늘의 미국 경제 뉴스</title>
  <style>
    :root {
      color-scheme: light dark;
      --bg: #f3f5f1;
      --paper: #ffffff;
      --paper-2: #e9eee8;
      --ink: #111814;
      --muted: #55605a;
      --line: #cbd2cc;
      --deep: #0d2d21;
      --green: #0c7650;
      --green-soft: #d8eee3;
      --red: #b23a2d;
      --red-soft: #f4ddd8;
      --gold: #a07121;
      --shadow: 0 12px 30px rgba(25, 42, 33, .09);
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --bg: #0c100e;
        --paper: #151b18;
        --paper-2: #1d2621;
        --ink: #f0f4f0;
        --muted: #acb7b0;
        --line: #39433d;
        --deep: #dfece4;
        --green: #72d2a3;
        --green-soft: #173a2c;
        --red: #ff9b8d;
        --red-soft: #47251f;
        --gold: #ddb867;
        --shadow: 0 14px 34px rgba(0, 0, 0, .28);
      }
    }
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      margin: 0;
      background: var(--bg);
      color: var(--ink);
      font-family: "Noto Sans KR", sans-serif;
      line-height: 1.65;
      -webkit-font-smoothing: antialiased;
    }
    a { color: inherit; }
    img { display: block; max-width: 100%; }
    .shell { width: min(1120px, 100%); margin: 0 auto; }
    .topline {
      position: sticky; top: 0; z-index: 20;
      display: flex; align-items: center; justify-content: space-between; gap: 14px;
      min-height: 50px; padding: 9px max(16px, env(safe-area-inset-left));
      background: color-mix(in srgb, var(--bg) 91%, transparent);
      border-bottom: 1px solid var(--line);
      backdrop-filter: blur(14px);
    }
    .date {
      font-size: 12px; font-weight: 800; letter-spacing: .03em; white-space: nowrap;
    }
    .jumpnav { display: flex; gap: 6px; overflow: hidden; justify-content: flex-end; }
    .jumpnav a {
      text-decoration: none; color: var(--muted); font-size: 11px; font-weight: 700;
      padding: 6px 8px; border-radius: 6px; white-space: nowrap;
    }
    @media (max-width: 419px) { .date-suffix { display: none; } }
    .jumpnav a:focus-visible { outline: 2px solid var(--green); outline-offset: 2px; }
    .audio-wrap { padding: 12px 14px 0; }
    .audio-player {
      padding: 15px 16px 16px; border: 1px solid var(--line); border-radius: 9px; background: var(--paper);
      box-shadow: 0 6px 18px rgba(25, 42, 33, .06);
    }
    .audio-heading { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; margin-bottom: 10px; }
    .audio-title { font-size: 13px; font-weight: 800; }
    .audio-meta { color: var(--muted); font-size: 10px; white-space: nowrap; }
    .audio-player audio { display: block; width: 100%; min-height: 54px; accent-color: var(--green); }
    .audio-note { margin: 7px 2px 0; color: var(--muted); font-size: 10px; line-height: 1.5; }
    .audio-status button {
      margin: -6px 0; padding: 6px 2px; border: 0; background: none; color: var(--green);
      font: inherit; font-weight: 800; text-decoration: underline; text-underline-offset: 2px; cursor: pointer;
    }
    .audio-status button:focus-visible { outline: 2px solid var(--green); outline-offset: 1px; border-radius: 3px; }
    .hero { padding: 14px 14px 0; }
    .hero-media {
      min-height: 440px; position: relative; overflow: hidden; border-radius: 10px;
      background: var(--deep);
      box-shadow: var(--shadow);
    }
    .hero-media img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
    .hero-media::after {
      content: ""; position: absolute; inset: 0;
      background: linear-gradient(180deg, rgba(5,14,10,.08) 15%, rgba(5,14,10,.86) 82%, rgba(5,14,10,.95));
    }
    .hero-copy { position: absolute; z-index: 1; inset: auto 0 0; padding: 28px 22px 25px; color: #fff; }
    .stamp {
      display: inline-flex; align-items: center; gap: 7px; margin-bottom: 12px;
      font-size: 11px; font-weight: 800; color: #ddede4;
    }
    .stamp::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: #58d592; }
    h1 {
      margin: 0; max-width: 800px; font-family: "Noto Serif KR", serif;
      font-size: clamp(34px, 8vw, 67px); line-height: 1.13; letter-spacing: -.045em; text-wrap: balance;
    }
    .dek { margin: 14px 0 0; max-width: 720px; color: #e5ece7; font-size: 14px; line-height: 1.7; }
    .market-wrap { padding: 12px 14px 0; }
    .market-strip {
      display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px;
      overflow: hidden; border: 1px solid var(--line); border-radius: 9px; background: var(--line);
    }
    .quote { min-width: 0; padding: 13px 11px; background: var(--paper); }
    .quote-name { display: block; color: var(--muted); font-size: 10px; font-weight: 800; letter-spacing: .02em; white-space: nowrap; }
    .quote-value { display: block; margin-top: 3px; font-size: 15px; font-weight: 800; font-variant-numeric: tabular-nums; white-space: nowrap; }
    .quote-change { display: block; font-size: 11px; font-weight: 800; font-variant-numeric: tabular-nums; }
    .up { color: var(--green); }
    .down { color: var(--red); }
    main { padding: 0 14px calc(80px + env(safe-area-inset-bottom)); }
    section { scroll-margin-top: 66px; }
    .brief {
      margin: 12px 0 36px; padding: 24px 20px; background: var(--deep); color: var(--bg);
      border-radius: 9px;
    }
    @media (prefers-color-scheme: dark) { .brief { background: #dce9e0; color: #101813; } }
    .brief-label { margin: 0 0 8px; font-size: 11px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; opacity: .68; }
    .brief p { margin: 0; font-family: "Noto Serif KR", serif; font-size: 19px; line-height: 1.62; letter-spacing: -.02em; }
    .section-head { display: flex; align-items: end; justify-content: space-between; gap: 18px; margin: 0 0 16px; }
    .section-head h2 { margin: 0; font-family: "Noto Serif KR", serif; font-size: 26px; line-height: 1.25; letter-spacing: -.035em; }
    .section-head p { margin: 0 0 2px; color: var(--muted); font-size: 11px; white-space: nowrap; }
    .lead-grid { display: grid; gap: 14px; }
    .feature {
      overflow: hidden; background: var(--paper); border: 1px solid var(--line); border-radius: 9px;
    }
    .feature-media { aspect-ratio: 16 / 9; overflow: hidden; background: var(--paper-2); }
    .feature-media img { width: 100%; height: 100%; object-fit: cover; }
    .feature-body { padding: 19px 18px 18px; }
    .eyebrow { display: flex; align-items: center; gap: 9px; margin-bottom: 8px; color: var(--green); font-size: 11px; font-weight: 800; }
    .eyebrow .num { color: var(--muted); font-variant-numeric: tabular-nums; }
    h3 { margin: 0; font-family: "Noto Serif KR", serif; font-size: 22px; line-height: 1.35; letter-spacing: -.03em; }
    .feature p, .story p { margin: 11px 0 0; color: var(--muted); font-size: 14px; }
    .signal-row { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 14px; }
    .signal {
      padding: 5px 8px; border-radius: 5px; background: var(--paper-2);
      font-size: 11px; font-weight: 800; font-variant-numeric: tabular-nums;
    }
    .sources { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 15px; }
    .sources a {
      text-decoration: none; color: var(--ink); font-size: 10px; font-weight: 800;
      border-bottom: 1px solid var(--line); padding-bottom: 2px;
    }
    .sources a::after { content: " ↗"; color: var(--muted); }
    .sources a:focus-visible, .sources a:hover { color: var(--green); border-color: currentColor; }
    .story-list { margin-top: 14px; border-top: 1px solid var(--ink); }
    .story {
      display: grid; grid-template-columns: 38px minmax(0, 1fr); gap: 10px;
      padding: 21px 2px; border-bottom: 1px solid var(--line);
    }
    .story-no { padding-top: 2px; color: var(--muted); font-size: 12px; font-weight: 800; font-variant-numeric: tabular-nums; }
    .story h3 { font-size: 19px; }
    .story strong { color: var(--ink); }
    .story details { margin-top: 12px; }
    .story summary { cursor: pointer; color: var(--green); font-size: 12px; font-weight: 800; list-style: none; }
    .story summary::-webkit-details-marker { display: none; }
    .story summary::after { content: "＋"; margin-left: 5px; }
    .story details[open] summary::after { content: "−"; }
    .story .detail-copy { margin-top: 8px; }
    .story-photo { grid-column: 1 / -1; margin-top: 4px; aspect-ratio: 16 / 8; overflow: hidden; border-radius: 7px; }
    .story-photo img { width: 100%; height: 100%; object-fit: cover; }
    .dashboard { margin-top: 42px; }
    .movers { display: grid; gap: 8px; }
    .mover {
      display: grid; grid-template-columns: minmax(76px, .7fr) minmax(66px, auto) minmax(0, 1.4fr); align-items: center; gap: 10px;
      min-height: 68px; padding: 12px 14px; background: var(--paper); border-bottom: 1px solid var(--line);
    }
    .mover:first-child { border-radius: 8px 8px 0 0; }
    .mover:last-child { border-radius: 0 0 8px 8px; border-bottom: 0; }
    .ticker { font-size: 13px; font-weight: 900; letter-spacing: .03em; }
    .move { font-size: 15px; font-weight: 900; font-variant-numeric: tabular-nums; }
    .reason { color: var(--muted); font-size: 12px; line-height: 1.45; }
    .tension {
      margin-top: 42px; display: grid; gap: 1px; background: var(--line); border: 1px solid var(--line); border-radius: 9px; overflow: hidden;
    }
    .tension-side { background: var(--paper); padding: 21px 18px; }
    .tension-side h3 { font-family: "Noto Sans KR", sans-serif; font-size: 14px; letter-spacing: 0; }
    .tension-side ul { margin: 12px 0 0; padding-left: 19px; color: var(--muted); font-size: 13px; }
    .tension-side li + li { margin-top: 8px; }
    .uncertain { margin-top: 42px; padding: 21px 18px; background: var(--paper-2); border-radius: 8px; }
    .uncertain h2 { margin: 0; font-family: "Noto Serif KR", serif; font-size: 20px; letter-spacing: -.025em; }
    .uncertain ul { margin: 12px 0 0; padding-left: 20px; color: var(--muted); font-size: 12px; }
    .uncertain li + li { margin-top: 7px; }
    .foot {
      display: flex; justify-content: space-between; gap: 18px; margin-top: 32px; padding-top: 18px;
      border-top: 1px solid var(--line); color: var(--muted); font-size: 10px;
    }
    @media (min-width: 720px) {
      .topline { padding-inline: 22px; }
      .jumpnav a { font-size: 12px; padding-inline: 10px; }
      .audio-wrap { padding: 16px 22px 0; }
      .audio-player { padding: 17px 18px 18px; }
      .audio-title { font-size: 14px; }
      .audio-meta { font-size: 11px; }
      .hero { padding: 20px 22px 0; }
      .hero-media { min-height: 540px; }
      .hero-copy { padding: 44px 42px 39px; }
      .dek { font-size: 16px; }
      .market-wrap { padding: 14px 22px 0; }
      .quote { padding: 16px 18px; }
      .quote-name { font-size: 11px; }
      .quote-value { font-size: 19px; }
      main { padding-inline: 22px; }
      .brief { padding: 28px 30px; }
      .brief p { font-size: 23px; }
      .lead-grid { grid-template-columns: 1.1fr .9fr; }
      .lead-grid .feature:first-child { grid-row: span 2; }
      .lead-grid .feature:first-child .feature-media { aspect-ratio: auto; height: 360px; }
      .lead-grid .feature:not(:first-child) { display: grid; grid-template-columns: 42% 1fr; }
      .lead-grid .feature:not(:first-child) .feature-media { aspect-ratio: auto; min-height: 100%; }
      .story-list { display: grid; grid-template-columns: 1fr 1fr; column-gap: 26px; }
      .story { align-content: start; }
      .story:nth-last-child(-n+2) { border-bottom: 0; }
      .movers { grid-template-columns: 1fr 1fr; gap: 1px; border: 1px solid var(--line); border-radius: 9px; overflow: hidden; background: var(--line); }
      .mover, .mover:first-child, .mover:last-child { border: 0; border-radius: 0; }
      .tension { grid-template-columns: 1fr 1fr; }
    }
    @media (min-width: 1000px) {
      .hero-media { min-height: 590px; }
      .market-strip { grid-template-columns: repeat(4, 1fr); }
      .feature-body { padding: 22px 22px 21px; }
      .story-list { grid-template-columns: repeat(3, 1fr); }
      .story { grid-template-columns: 34px minmax(0,1fr); border-bottom: 0; border-right: 1px solid var(--line); padding-right: 20px; }
      .story:last-child { border-right: 0; }
    }
    @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
  </style>
</head>
<body>
  <div class="shell">
    <header class="topline" aria-label="기사 내비게이션">
      <div class="date">{{DATE_DOT}} · {{WEEKDAY}}<span class="date-suffix"> 아침 브리핑</span></div>
      <nav class="jumpnav">
        <a href="#market">시장</a><a href="#news">뉴스</a><a href="#stocks">종목</a><a href="#risks">리스크</a>
      </nav>
    </header>

    <div class="audio-wrap">
      <section class="audio-player" aria-labelledby="audio-title">
        <div class="audio-heading"><strong class="audio-title" id="audio-title">오늘의 음성 브리핑</strong><span class="audio-meta">{{AUDIO_MMSS}} · 한국어 · {{DATE_KO}}</span></div>
        <audio id="briefing-audio" controls preload="none" playsinline aria-label="{{DATE_KO}} 미국 경제 뉴스 음성 브리핑">
          <source src="data:audio/mpeg;base64,{{MP3_BASE64}}" type="audio/mpeg" />
          이 환경에서는 오디오 재생을 지원하지 않습니다.
        </audio>
        <p class="audio-note">페이지에서 재생 버튼을 누르면 {{AUDIO_KO}} 전체 브리핑을 바로 들을 수 있습니다.</p>
      </section>
    </div>

    <div class="hero">
      <article class="hero-media">
        <img src="{{HERO_IMG}}" alt="{{HERO_ALT}}" />
        <div class="hero-copy">
          <div class="stamp">{{WEEKDAY}} 아침 · {{SESSION_WEEKDAY}} 장 마감 기준</div>
          <h1>{{HEADLINE_1}}<br>{{HEADLINE_2}}</h1>
          <p class="dek">{{DEK}}</p>
        </div>
      </article>
    </div>

    <div class="market-wrap" id="market">
      <div class="market-strip" aria-label="{{SESSION_DATE_KO}} 주요 시장 종가">
        <!-- 반복 4개: 다우, S&amp;P 500, 나스닥, 오늘의 네 번째 지표 -->
        <div class="quote"><span class="quote-name">{{Q_NAME}}</span><span class="quote-value">{{Q_VALUE}}</span><span class="quote-change {{Q_DIR}}">{{Q_CHANGE}}</span></div>
        <!-- /반복 -->
      </div>
    </div>

    <main>
      <section class="brief" aria-label="오늘 한 문장">
        <p class="brief-label">오늘 한 문장</p>
        <p>{{ONE_LINER}}</p>
      </section>

      <section id="news">
        <div class="section-head"><h2>{{WEEKDAY}} 아침의 7가지</h2><p>새 전개 중심</p></div>
        <div class="lead-grid">
          <!-- 반복 3개: 가장 중요한 기사 3개 (첫 카드가 가장 크게 보임), 카드 사이에 빈 줄 -->
          <article class="feature">
            <div class="feature-media"><img src="{{F_IMG}}" alt="{{F_ALT}}" /></div>
            <div class="feature-body">
              <div class="eyebrow"><span class="num">{{F_NUM}}</span> {{F_LABEL}}</div>
              <h3>{{F_TITLE}}</h3>
              <p>{{F_BODY}}</p>
              <div class="signal-row">{{F_SIGNALS}}</div>
              <div class="sources">{{F_SOURCES}}</div>
            </div>
          </article>
          <!-- /반복 -->
        </div>

        <div class="story-list">
          <!-- 반복 4개: 나머지 기사 -->
          <article class="story">
            <div class="story-no">{{S_NUM}}</div><div>
              <h3>{{S_TITLE}}</h3>
              <p>{{S_BODY}}</p>
              <details><summary>{{S_MORE_LABEL}}</summary><p class="detail-copy">{{S_MORE}}</p></details>
              <div class="sources">{{S_SOURCES}}</div>
            </div>
          </article>
          <!-- /반복 -->
        </div>
      </section>

      <section class="dashboard" id="stocks">
        <div class="section-head"><h2>종목 온도계</h2><p>{{SESSION_DATE_KO}}</p></div>
        <div class="movers">
          <!-- 반복 6개 -->
          <div class="mover"><div class="ticker">{{M_TICKER}}</div><div class="move {{M_DIR}}">{{M_CHANGE}}</div><div class="reason">{{M_REASON}}</div></div>
          <!-- /반복 -->
        </div>
        <div class="sources">{{STOCK_SOURCES}}</div>
      </section>

      <section id="risks" class="tension" aria-label="상승 동력과 남은 리스크">
        <div class="tension-side">
          <h3 class="up">상승을 만든 힘</h3>
          <ul>{{UP_ITEMS}}</ul>
        </div>
        <div class="tension-side">
          <h3 class="down">남아 있는 압력</h3>
          <ul>{{DOWN_ITEMS}}</ul>
        </div>
      </section>

      <section class="uncertain" aria-labelledby="open-title">
        <h2 id="open-title">확인 범위와 열린 질문</h2>
        <ul>
          <!-- 반복 3~5개 -->
          <li>{{OPEN_ITEM}}</li>
          <!-- /반복 -->
        </ul>
      </section>

      <footer class="foot">
        <span>{{DATE_LONG}} 오전 업데이트 · {{SESSION_DATE_KO}} 미국 장 마감 기준</span>
        <span>정보 제공 목적 · 투자 조언 아님</span>
      </footer>
    </main>
  </div>
  <script>
    // 음성 브리핑 재생 안정화
    // 1) HTML에 내장된 MP3(data: URI)를 Blob URL로 바꿔 재생한다. 대용량 data: URI 오디오는 모바일 브라우저에서 끊기기 쉽다.
    // 2) 재생 중 오류가 나거나 5초 이상 멈추면 마지막 위치에서 자동으로 이어서 재생한다.
    // 3) 재생 위치를 기억하고, 재생 중에는 화면 자동 꺼짐을 막고, 잠금화면 컨트롤에 제목을 표시한다.
    (() => {
      const audio = document.getElementById('briefing-audio');
      const source = audio && audio.querySelector('source');
      if (!audio || !source) return;

      const dataUrl = source.getAttribute('src') || '';
      const b64 = dataUrl.slice(dataUrl.indexOf(',') + 1);
      const storeKey = 'briefing-audio-pos:' + b64.length + ':' + b64.slice(4096, 4128);

      let blobUrl = '';
      let upgraded = false;
      let wantPlaying = false; // 사용자가 재생을 원하는 상태
      let pending = null;      // 소스를 다시 불러온 뒤 복원할 { at, play, rate }
      let lastGood = 0;        // 마지막으로 정상 재생된 위치(초)
      let lastSaved = -1;
      let touched = false;     // 이 페이지에서 재생한 적이 있을 때만 위치를 저장한다
      let retries = 0;
      let retryFrom = 0;

      const fmt = s => Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
      const store = {
        get() { try { return Number(localStorage.getItem(storeKey)) || 0; } catch (e) { return 0; } },
        set(v) { try { localStorage.setItem(storeKey, String(Math.floor(v))); } catch (e) {} },
        clear() { try { localStorage.removeItem(storeKey); } catch (e) {} },
      };

      // 이어 듣기·오류 안내 한 줄
      const status = document.createElement('p');
      status.className = 'audio-note audio-status';
      status.hidden = true;
      (audio.parentNode.querySelector('.audio-note') || audio).after(status);
      function say(text, withRestart) {
        status.textContent = text;
        if (withRestart) {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.textContent = '처음부터 듣기';
          btn.addEventListener('click', () => {
            resumeAt = 0;
            if (pending) pending.at = 0;
            audio.currentTime = 0;
            store.clear();
            status.hidden = true;
          });
          status.append(' ', btn);
        }
        status.hidden = false;
      }

      const saved = store.get();
      let resumeAt = saved > 5 ? saved : 0;
      if (resumeAt) say('지난번 ' + fmt(resumeAt) + '까지 들으셨습니다. 재생하면 그 지점부터 이어집니다.', true);

      function toBytes(s) {
        if (typeof Uint8Array.fromBase64 === 'function') return Uint8Array.fromBase64(s);
        const bin = atob(s);
        const bytes = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        return bytes;
      }

      // 소스를 다시 불러오고, 메타데이터가 준비되면 위치·속도·재생 상태를 복원한다.
      // url이 비어 있으면 <source>의 data: URI로 되돌아간다.
      function reload(url, at, play) {
        pending = { at, play, rate: audio.playbackRate || 1 };
        audio.preload = 'auto';
        if (url && audio.getAttribute('src') !== url) {
          audio.src = url; // src를 바꾸면 브라우저가 load()를 실행한다
        } else {
          if (!url) audio.removeAttribute('src');
          audio.load();
        }
      }

      function resume() {
        audio.play().catch(e => {
          if (e && e.name === 'NotAllowedError') {
            wantPlaying = false;
            say(fmt(audio.currentTime) + '에서 멈췄습니다. 재생 버튼을 누르면 이어서 들을 수 있습니다.');
          }
        });
      }

      audio.addEventListener('loadedmetadata', () => {
        if (!pending) return;
        const { at, play, rate } = pending;
        pending = null;
        audio.defaultPlaybackRate = audio.playbackRate = rate;
        if (at > 0 && isFinite(audio.duration)) audio.currentTime = Math.min(at, audio.duration - 1);
        if (play) resume();
      });

      function upgrade() {
        if (upgraded) return;
        upgraded = true;
        const started = !audio.paused || audio.currentTime > 0;
        const at = audio.currentTime > 0 ? audio.currentTime : resumeAt;
        try {
          blobUrl = URL.createObjectURL(new Blob([toBytes(b64)], { type: 'audio/mpeg' }));
        } catch (e) {
          blobUrl = '';
        }
        if (blobUrl) reload(blobUrl, at, !audio.paused);
        else if (!started) reload('', at, false);
      }

      function recover() {
        if (!upgraded) { upgrade(); return; }
        if (retries >= 4) {
          pending = null;
          wantPlaying = false;
          say('재생이 계속 끊깁니다. 페이지를 새로 고친 뒤 다시 재생해 주세요.');
          return;
        }
        retries++;
        retryFrom = lastGood;
        // Blob 재생이 두 번 실패하면 원래 data: URI로 전환
        reload(blobUrl && retries < 3 ? blobUrl : '', Math.max(0, lastGood - 1), wantPlaying);
      }

      function savePos() {
        if (pending || !touched) return;
        const t = audio.currentTime;
        const d = audio.duration;
        lastSaved = t;
        if (t > 5 && !(d && t > d - 5)) store.set(t);
        else store.clear();
      }

      audio.addEventListener('play', () => {
        wantPlaying = true;
        touched = true;
        if (!upgraded) upgrade();
      });
      audio.addEventListener('playing', keepAwake);
      audio.addEventListener('pause', () => {
        if (!pending) wantPlaying = false;
        allowSleep();
        savePos();
      });
      audio.addEventListener('ended', () => {
        wantPlaying = false;
        retries = 0;
        store.clear();
        status.hidden = true;
        allowSleep();
      });
      audio.addEventListener('timeupdate', () => {
        if (pending || audio.seeking) return;
        const t = audio.currentTime;
        if (t > 0) lastGood = t;
        if (retries && t > retryFrom + 15) retries = 0; // 복구 후 15초 이상 정상 재생되면 초기화
        if (Math.abs(t - lastSaved) >= 3) savePos();
      });
      audio.addEventListener('error', recover);
      source.addEventListener('error', recover);

      // 재생 중인데 5초 동안 위치가 그대로면 멈춘 것으로 보고 복구한다.
      let lastTick = -1;
      let stuck = 0;
      setInterval(() => {
        if (!wantPlaying || audio.ended || audio.seeking) { stuck = 0; return; }
        const t = audio.currentTime;
        if (t !== lastTick) { lastTick = t; stuck = 0; return; }
        if (++stuck >= 5) { stuck = 0; recover(); }
      }, 1000);

      // 재생 중 화면 자동 꺼짐 방지 (지원 브라우저만)
      let wakeLock = null;
      let locking = false;
      async function keepAwake() {
        if (wakeLock || locking || !('wakeLock' in navigator) || document.visibilityState !== 'visible') return;
        locking = true;
        try {
          const lock = await navigator.wakeLock.request('screen');
          if (audio.paused) {
            lock.release().catch(() => {});
          } else {
            wakeLock = lock;
            lock.addEventListener('release', () => { if (wakeLock === lock) wakeLock = null; });
          }
        } catch (e) {
        } finally {
          locking = false;
        }
      }
      function allowSleep() {
        if (wakeLock) wakeLock.release().catch(() => {});
        wakeLock = null;
      }
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') { if (!audio.paused) keepAwake(); }
        else savePos();
      });
      window.addEventListener('pagehide', savePos);

      // 잠금화면·알림 컨트롤
      if ('mediaSession' in navigator) {
        const ms = navigator.mediaSession;
        try {
          ms.metadata = new MediaMetadata({
            title: (document.getElementById('audio-title') || document.querySelector('title')).textContent.trim(),
            artist: document.title,
            album: ((document.querySelector('.date') || {}).textContent || '').trim(),
          });
        } catch (e) {}
        const seek = t => { audio.currentTime = Math.max(0, Math.min(t, (audio.duration || t) - 0.1)); };
        const action = (name, fn) => { try { ms.setActionHandler(name, fn); } catch (e) {} };
        action('seekbackward', d => seek(audio.currentTime - ((d && d.seekOffset) || 10)));
        action('seekforward', d => seek(audio.currentTime + ((d && d.seekOffset) || 10)));
        action('seekto', d => { if (d && isFinite(d.seekTime)) seek(d.seekTime); });
        const syncPosition = () => {
          if (!ms.setPositionState || !isFinite(audio.duration) || !audio.duration) return;
          try {
            ms.setPositionState({ duration: audio.duration, playbackRate: audio.playbackRate || 1, position: Math.min(audio.currentTime, audio.duration) });
          } catch (e) {}
        };
        ['loadedmetadata', 'play', 'pause', 'seeked', 'ratechange'].forEach(ev => audio.addEventListener(ev, syncPosition));
      }

      // 첫 화면을 그린 뒤 변환한다 (백그라운드 탭이면 setTimeout이 대신 실행).
      requestAnimationFrame(() => setTimeout(upgrade, 0));
      setTimeout(upgrade, 1500);
    })();
  </script>
</body>
</html>
```

## 부록 B. 점검 스크립트 — `check_briefing.py`

아래 블록 전체가 `~/briefing/check_briefing.py`다.

```python check_briefing.py
#!/usr/bin/env python3
# 브리핑 HTML 최종 점검 — 사용법: python3 check_briefing.py 결과파일.html
# [필수]가 하나라도 나오면 고친 뒤 다시 실행한다. "통과"가 나와야 전달할 수 있다.
import base64, hashlib, os, re, shutil, subprocess, sys, tempfile

SCRIPT_SHA = '0c09aaecc05c6d1a'  # 부록 A 템플릿의 재생 안정화 스크립트 지문


def norm(s):
    return '\n'.join(l.strip() for l in s.splitlines() if l.strip())


def main(path):
    html = open(path, encoding='utf-8').read()
    must, warn = [], []

    def need(ok, msg):
        if not ok:
            must.append(msg)

    def hint(ok, msg):
        if not ok:
            warn.append(msg)

    # 1) 파일 전체
    size = os.path.getsize(path) / 1e6
    need(size <= 8, f'파일 {size:.1f}MB — 8MB 이하로 (이미지 압축, 음성 64kbps)')
    hint(size <= 5, f'파일 {size:.1f}MB — 5MB 이하 권장')
    left = sorted(set(re.findall(r'\{\{([A-Z0-9_]+)\}\}', html)))
    need(not left, '채우지 않은 자리표시자: ' + ', '.join(left))
    hint('<!-- 반복' not in html, '반복 표시 주석(<!-- 반복 … -->)을 지우기')

    # 2) 음성 태그와 재생 안정화 스크립트
    need(html.count('<audio') == 1 and '<audio id="briefing-audio" controls preload="none" playsinline' in html,
         'audio 태그는 템플릿 그대로 1개: <audio id="briefing-audio" controls preload="none" playsinline …>')
    need('application/octet-stream' not in html, 'data URI의 MIME이 application/octet-stream — audio/mpeg로')
    m = re.search(r'<source src="data:audio/mpeg;base64,([A-Za-z0-9+/=]+)" type="audio/mpeg" />', html)
    need(m, '<source src="data:audio/mpeg;base64,…" type="audio/mpeg" /> 형식이 아님 (base64에 줄바꿈·공백 금지)')
    scripts = re.findall(r'<script>(.*?)</script>', html, re.S)
    need(any(hashlib.sha256(norm(s).encode()).hexdigest()[:16] == SCRIPT_SHA for s in scripts),
         '재생 안정화 스크립트가 없거나 템플릿과 다름 — 부록 A의 <script> 블록을 그대로 복사')

    # 3) 구조
    for cls, n in (('quote', 4), ('feature', 3), ('story', 4), ('mover', 6)):
        c = html.count(f'class="{cls}"')
        need(c == n, f'class="{cls}" {c}개 — {n}개여야 함')

    def count_li(pattern):
        b = re.search(pattern, html, re.S)
        return b.group(1).count('<li>') if b else 0

    need(count_li(r'<h3 class="up">.*?<ul>(.*?)</ul>') == 4, '상승을 만든 힘은 4개')
    need(count_li(r'<h3 class="down">.*?<ul>(.*?)</ul>') == 4, '남아 있는 압력은 4개')
    need(3 <= count_li(r'id="open-title".*?<ul>(.*?)</ul>') <= 5, '확인 범위와 열린 질문은 3~5개')

    # 4) 출처와 이미지
    links = re.findall(r'<a href="([^"]+)" target="_blank" rel="noopener">', html)
    need(len(links) >= 8, f'출처 링크 {len(links)}개 — 기사마다 1개 이상 + 종목 출처')
    need(all(u.startswith(('https://', 'http://')) for u in links), '출처 링크는 원문 URL(http/https)만')
    hint(not any(re.search(r'google\.[a-z.]+/(search|url)|news\.google\.|bing\.com/search', u) for u in links),
         '검색 결과 페이지 링크가 있음 — 기사 원문 URL로')
    imgs = re.findall(r'<img src="([^"]*)" alt="([^"]*)"', html)
    need(len(imgs) == 4, f'이미지 {len(imgs)}개 — 히어로 1 + 카드 3')
    for i, (src, alt) in enumerate(imgs, 1):
        need(re.match(r'data:image/(webp|jpeg|png);base64,', src), f'이미지 {i}: data URI(webp/jpeg/png)로 넣기')
        need(alt.strip(), f'이미지 {i}: alt 비어 있음')
        kb = len(src) * 3 / 4 / 1024
        hint(kb <= 320, f'이미지 {i}: {kb:.0f}KB — 300KB 이하로 압축 권장')

    # 5) MP3 자체
    audio_info = ''
    if m:
        mp3 = base64.b64decode(m.group(1))
        need(len(re.findall(rb'ID3[\x02-\x04]\x00', mp3)) <= 1,
             'MP3 안에 ID3 태그가 여러 개 — 조각을 이어 붙인 흔적. WAV로 합친 뒤 한 번만 인코딩')
        need(len(re.findall(rb'(?:Xing|Info)\x00\x00\x00', mp3)) <= 1,
             'MP3 안에 Xing/Info 헤더가 여러 개 — 조각을 이어 붙인 흔적. WAV로 합친 뒤 한 번만 인코딩')
        if shutil.which('ffmpeg') and shutil.which('ffprobe'):
            with tempfile.NamedTemporaryFile(suffix='.mp3', delete=False) as f:
                f.write(mp3)
            try:
                r = subprocess.run(['ffmpeg', '-v', 'error', '-i', f.name, '-f', 'null', '-'],
                                   capture_output=True, text=True)
                need(r.returncode == 0 and not r.stderr.strip(), 'MP3 디코딩 오류: ' + r.stderr.strip()[:200])
                out = subprocess.run(['ffprobe', '-v', 'error', '-show_entries',
                                      'format=duration:stream=codec_name,channels,sample_rate,bit_rate',
                                      '-of', 'default=nw=1', f.name], capture_output=True, text=True).stdout
            finally:
                os.unlink(f.name)
            info = dict(l.split('=', 1) for l in out.split() if '=' in l)
            dur = float(info.get('duration') or 0)
            need(info.get('codec_name') == 'mp3', 'MP3(libmp3lame)로 인코딩')
            need(150 <= dur <= 330, f'음성 길이 {dur:.0f}초 — 2분 30초~5분 30초 안에서 (목표 3분 30초~4분 30초)')
            hint(200 <= dur <= 280, f'음성 길이 {dur:.0f}초 — 목표 3분 30초~4분 30초')
            mm, ss = int(dur // 60), int(dur % 60)
            need(f'>{mm}:{ss:02d} · 한국어 · ' in html, f'플레이어 길이 표기를 실제 길이 {mm}:{ss:02d}로')
            ko = f'{mm}분 {ss}초' if ss else f'{mm}분'
            need(f'누르면 {ko} 전체' in html, f'안내 문구의 길이를 "{ko}"로')
            hint(info.get('channels') == '1', '음성은 모노(1채널) 권장')
            audio_info = f'음성 {mm}:{ss:02d} · {len(mp3) / 1e6:.1f}MB · {info.get("sample_rate")}Hz · {info.get("channels")}ch'
        else:
            warn.append('ffmpeg/ffprobe가 없어 MP3 디코딩 검사를 건너뜀')

    for x in must:
        print('[필수]', x)
    for x in warn:
        print('[권장]', x)
    print(f'파일 {size:.1f}MB' + (f' · {audio_info}' if audio_info else ''))
    print('통과' if not must else f'실패: [필수] {len(must)}건')
    return 0 if not must else 1


if __name__ == '__main__':
    if len(sys.argv) != 2:
        sys.exit('사용법: python3 check_briefing.py 결과파일.html')
    sys.exit(main(sys.argv[1]))
```
