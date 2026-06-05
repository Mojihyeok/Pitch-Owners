# PITCH OWNERS — Fan Web · Claude Code 실행 가이드 (README)

이 폴더의 프롬프트를 **Claude Code에 어떤 순서로, 어떻게 먹일지**에 대한 안내다.

## 파일 구성
- `00_FOUNDATION.md` — 프로젝트 셋업·디자인 토큰·공통 레이아웃/컴포넌트·라우팅 (기반)
- `01_FAN_WEB_PAGES.md` — Fan Web 메뉴별 상세 페이지 명세
- `02_ENTRY_AND_LANDING.md` — 전북현대 진입점 + PITCH OWNERS 전용 랜딩 페이지 (+ FOUNDATION 라우팅 수정사항 포함)
- `README_HOW_TO_USE.md` — 이 파일

> ⚠️ `02_ENTRY_AND_LANDING.md` 상단에 **FOUNDATION 라우팅 수정사항**이 있다.
> 루트(`/`)를 랜딩으로 바꾸고 앱 화면들을 `(app)` 라우트 그룹으로 옮기는 내용이므로,
> Step 1(기반)에서 이 수정사항을 함께 반영하는 것이 깔끔하다.

## 권장 워크플로 (Claude Code)

### Step 0 — 모델 설정
- 앱 개발 작업은 **Sonnet** 권장(과도한 extended thinking 방지).
- 프로젝트 루트에서 Claude Code 실행.

### Step 1 — 기반 구축
Claude Code에 다음과 같이 지시:
```
00_FOUNDATION.md를 읽고, "8. 완료 기준" 체크리스트를 전부 충족할 때까지
프로젝트 셋업 → 디자인 토큰 → 공통 레이아웃/컴포넌트 → 라우팅 골격을 구현해줘.
페이지 내부 구현은 아직 하지 말고, 빈 페이지 + 탭 이동까지만.
다 되면 npm run dev로 확인할 수 있게 해줘.
```
→ `npm run dev`로 다크 테마·탭바·라우팅 직접 확인 후 다음 단계.

### Step 2 — 페이지별 구현 (한 번에 하나씩)
한 페이지씩 끊어서 지시해야 품질이 좋다. 예:
```
01_FAN_WEB_PAGES.md의 "1. 그라운드 맵 + 격자 입양"을 구현해줘.
비로그인/입양 전 vs 오너 활성 분기를 둘 다 만들고,
src/mocks/grids.ts에 타입 명시한 mock 데이터로 442 격자를 채워줘.
완료 기준 체크리스트를 지키고, 디자인 토큰만 사용해.
```
구현 순서는 파일의 "구현 순서(임팩트 우선)" 그대로:
1. `/ground` → 2. `/my` → 3. `/matchday` → 4. badges·rewards → 5. governance·board → 6. community·events·account

### Step 2.5 — 진입점 + 랜딩 (`02_ENTRY_AND_LANDING.md`)
앱 페이지들이 어느 정도 자리잡으면(특히 `/ground` 완성 후) 진입점·랜딩을 붙인다:
```
02_ENTRY_AND_LANDING.md의 A(전북현대 진입점)와 B(PITCH OWNERS 랜딩)를 구현해줘.
상단의 FOUNDATION 라우팅 수정사항((app) 그룹 분리, / 를 랜딩으로)을 먼저 반영하고,
랜딩 CTA가 /ground로 연결되게 해줘. 전북현대 데모(/jeonbuk-demo)는 화이트 테마로,
앱 본체는 다크 테마로 분리 유지해.
```
> 랜딩은 `/ground`가 있어야 CTA 연결 확인이 되므로 `/ground` 이후에 하는 걸 권장.
> 단, FOUNDATION 라우팅 수정((app) 그룹 분리)만큼은 Step 1에서 미리 해두면 이후가 깔끔하다.

### Step 3 — 검수 포인트 (각 페이지 후)
- [ ] 하드코딩 색/간격 없는지 (`grep -rn "#" src` 로 임의 헥스 점검)
- [ ] `any` 없는지
- [ ] 비로그인/오너 분기 둘 다 동작하는지 (계정 페이지 데모 토글로 전환)
- [ ] 480px 모바일 컨테이너에서 레이아웃 안 깨지는지

## 디자인 레퍼런스 메모 (전북현대 모바일)
- 다크 전면(거의 블랙) + 딥그린 브랜드 + 형광 옐로우 액센트.
- 카드 스택 레이아웃, 둥근 모서리(16px), 섹션 여백 넉넉.
- 카운트다운/핵심 CTA = 옐로우. 섹션 배경/보조 CTA = 그린.
- 토큰은 `00_FOUNDATION.md`의 "4. 디자인 토큰"에 전부 정의됨.

## 주의 / 범위
- 이번 작업은 **Fan Web만**. Club Admin / Partner Web은 별도.
- 결제·NFC·WebSocket은 **mock**으로만(실연동 X).
- "격자 입양/소유"는 법적으로 **후원·기부의 게이미피케이션**임을 UI 문구에 반드시 명시.
