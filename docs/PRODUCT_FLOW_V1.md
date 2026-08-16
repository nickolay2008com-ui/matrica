# Matrica — Product Flow v1

## Product promise

Matrica is a calm decision navigator. The Matrix is an archetypal signal layer; the product turns those signals into hypotheses, checks them against reality, compares options and ends with one concrete, preferably reversible, next step.

## Visual contract

The approved five-screen reference is the default visual state and must remain recognizable without added permanent UI blocks:

1. **Добро пожаловать** — value and calm entry.
2. **Ваш вопрос** — one current life decision, expressed briefly.
3. **Ваша матрица** — the user's Matrix as a signal map, not a verdict.
4. **Анализ решения** — the seven-step protocol.
5. **Рекомендация** — synthesis, risk/resource framing and one next action.

New explanatory content should appear in transient calm bottom sheets or existing controls, not by crowding the five reference screens.

## Core interaction logic

### 1. Welcome

`Начать путь` opens the current decision session. Do not add a long questionnaire here.

### 2. Question

The user provides one concrete question. A very short/non-actionable input is gently stopped before analysis. The existing tip card is reused for feedback instead of adding an error block.

The reference question `Открывать ли свой бизнес?` doubles as a demo state.

### 3. Matrix

This screen answers: **what personal signals may be relevant to this question?**

The `i` control explains the epistemic rule:

`Сигнал → гипотеза → проверка → действие`

`Обзор` moves to the seven-step analysis. `История` opens saved decisions. The Matrix calculation itself should be supplied by the selected Matrix/profile provider; the decision flow must not invent a new calculation formula.

### 4. Seven-step analysis

Each existing row is functional and opens the relevant detail without changing the list layout:

1. Вопрос
2. Сигналы
3. Гипотезы
4. Факты
5. Варианты
6. Ход
7. Следующий шаг

The content adapts to the question domain. v1 includes business, career, relationships, partnership, money, relocation and a general mode, with explicit safety and medical overrides.

High-stakes reality always outranks symbolic interpretation.

### 5. Recommendation

The final screen is not a prophecy. It synthesizes the current direction, risk/resource framing and a concrete next action.

`Сделать обратимый шаг` reveals the specific action and why it is useful. `Сохранить результат` stores the decision locally; `История` can reopen it.

## Product rules

- Facts and Matrix interpretations must remain distinguishable.
- Do not force a binary yes/no when a safer third path or staged test exists.
- Prefer a small action that generates new information before an irreversible action.
- Safety, medicine, law and major financial downside cannot be overridden by Matrix resonance.
- No permanent UI element should be added merely to explain something that can live behind an existing control.
- Mobile arrow/swipe navigation must not steal cursor movement from the question field.
- Reduced-motion preferences remain respected.

## Next integration boundary

The next technical layer is a real `matrix_signals` provider (chosen school/calculation) and, after that, an AI synthesis service. Both should plug into this flow without redesigning the five screens.
