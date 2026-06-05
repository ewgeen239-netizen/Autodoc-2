export const theme = {
  bg: "#0B0F14",
  card: "#111826",
  card2: "#0F1623",
  text: "#E6EDF3",
  muted: "#8B98A5",
  blue: "#4DA3FF",
  green: "#00D18F",
  border: "#1F2A37"
};

export const styles = {
  app: {
    background: theme.bg,
    minHeight: "100vh",
    padding: 16,
    fontFamily: "Inter, system-ui",
    color: theme.text
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 18,
    alignItems: "center"
  },

  title: {
    fontSize: 20,
    fontWeight: 700
  },

  subtitle: {
    fontSize: 12,
    color: theme.muted,
    marginTop: 4
  },

  userBox: {
    fontSize: 12,
    padding: "6px 10px",
    background: theme.card,
    border: `1px solid ${theme.border}`,
    borderRadius: 10,
    color: theme.muted
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 10,
    marginBottom: 14
  },

  kpi: {
    background: theme.card,
    padding: 12,
    borderRadius: 14,
    border: `1px solid ${theme.border}`
  },

  kpiLabel: {
    fontSize: 11,
    color: theme.muted
  },

  kpiValue: {
    fontSize: 18,
    fontWeight: 700,
    marginTop: 6
  },

  card: {
    background: theme.card,
    padding: 14,
    borderRadius: 14,
    border: `1px solid ${theme.border}`,
    marginBottom: 14
  },

  cardTitle: {
    fontSize: 12,
    color: theme.muted,
    marginBottom: 10,
    letterSpacing: 1
  },

  input: {
    width: "100%",
    padding: 10,
    marginBottom: 8,
    borderRadius: 10,
    border: `1px solid ${theme.border}`,
    background: theme.card2,
    color: theme.text,
    outline: "none"
  },

  button: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    border: "none",
    background: theme.blue,
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer"
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: 10
  },

  item: {
    background: theme.card,
    padding: 12,
    borderRadius: 14,
    border: `1px solid ${theme.border}`
  },

  itemTop: {
    fontSize: 14
  },

  itemBottom: {
    fontSize: 12,
    color: theme.muted,
    marginTop: 4
  }
};