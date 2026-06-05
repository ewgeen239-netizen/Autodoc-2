import { theme } from "./theme";
import { radius, spacing } from "./tokens";

export const styles = {
  app: {
    background: theme.bg,
    minHeight: "100vh",
    padding: spacing.md,
    color: theme.text,
    fontFamily: "Inter, system-ui"
  },

  card: {
    background: theme.card,
    border: `1px solid ${theme.border}`,
    borderRadius: radius.md,
    padding: spacing.md
  },

  input: {
    width: "100%",
    padding: spacing.sm,
    borderRadius: radius.sm,
    border: `1px solid ${theme.border}`,
    background: "#0F1623",
    color: theme.text,
    outline: "none"
  },

  button: {
    width: "100%",
    padding: spacing.sm,
    borderRadius: radius.sm,
    border: "none",
    background: theme.blue,
    color: "#fff",
    fontWeight: 600
  }
};