# Calculation method v1

The client-side calculator uses an explicitly documented 22-arcana reduction method.

- Values 1–22 remain unchanged.
- Values above 22 are reduced by repeatedly summing their digits until the result is 1–22.
- Day = reduced birth day.
- Month = birth month.
- Year = reduced sum of year digits.
- Karmic/bottom anchor = reduce(day + month + year).
- Center = reduce(day + month + year + bottom anchor).
- Additional points are produced by sums of neighbouring anchors; the near/far axis points and heart/money-related points follow the same reduction rule.

Reference methodology used while implementing:
- Matrix.Destiny methodology: https://matrixdestiny.io/en/methodology
- Matricasudby calculation guide: https://matricasudby.com/blog/kak-rasschitat-matricu-sudby-po-date-rozhdeniya

Important: different schools can use slightly different conventions. The calculation provider is isolated in `src/engine.js` so the formula can be replaced without changing the product flow or UI.
