// 체크아웃 정책 함수 (mock).
// 가격·정원·인당분담은 zonePolicy(priceOf/maxOf/perHeadOf)에서 파생.

// 전북현대 통합회원 아이디 가짜 검증: 4자 이상 영숫자.
export function mockVerifyJeonbukId(id: string): boolean {
  return /^[a-zA-Z0-9]{4,}$/.test(id.trim());
}

// 팀명 가짜 중복/유효성 체크.
const RESERVED_TEAM_NAMES = ["전북현대", "관리자", "admin", "pitchowners"];

export interface TeamNameCheck {
  ok: boolean;
  reason?: string;
}

export function mockCheckTeamName(name: string): TeamNameCheck {
  const v = name.trim();
  if (v.length < 2 || v.length > 20) {
    return { ok: false, reason: "2~20자로 입력해주세요." };
  }
  if (!/^[가-힣a-zA-Z0-9 ]+$/.test(v)) {
    return { ok: false, reason: "한글·영문·숫자만 사용할 수 있어요." };
  }
  if (RESERVED_TEAM_NAMES.includes(v.toLowerCase().replace(/\s/g, ""))) {
    return { ok: false, reason: "이미 사용 중인 이름이에요." };
  }
  return { ok: true };
}
