// Neon Postgres-backed adventure CRUD
// Table: adventures (id, state JSONB, name, player_names, badges, archived, last_played_at)

const { neon } = require('@neondatabase/serverless');

function getSQL() {
  return neon(process.env.DATABASE_URL);
}

// Auto-create table on first use
async function ensureTable(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS adventures (
      id TEXT PRIMARY KEY,
      state JSONB NOT NULL,
      name TEXT,
      player_names TEXT[],
      badges INTEGER DEFAULT 0,
      archived BOOLEAN DEFAULT false,
      last_played_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ DEFAULT now()
    )
  `;
}

module.exports = async function handler(req, res) {
  if (!process.env.DATABASE_URL) {
    res.status(500).json({ error: 'DATABASE_URL not configured' });
    return;
  }

  const sql = getSQL();
  const { method } = req;
  const id = req.query?.id;

  try {
    await ensureTable(sql);

    // GET — list all or load single
    if (method === 'GET') {
      if (id) {
        const rows = await sql`
          SELECT state FROM adventures WHERE id = ${id}
        `;
        if (rows.length === 0) {
          res.status(404).json({ error: 'Adventure not found' });
          return;
        }
        res.json(rows[0].state);
        return;
      }
      // Return index (lightweight metadata for list screen)
      const rows = await sql`
        SELECT id, name, player_names, badges, archived, last_played_at
        FROM adventures
        ORDER BY last_played_at DESC
      `;
      const index = rows.map(r => ({
        id: r.id,
        name: r.name,
        playerNames: r.player_names,
        badges: r.badges,
        archived: r.archived,
        lastPlayedAt: r.last_played_at,
      }));
      res.json(index);
      return;
    }

    // POST — save/update adventure (upsert)
    if (method === 'POST') {
      const state = req.body;
      if (!state || !state.id) {
        res.status(400).json({ error: 'Adventure state with id required' });
        return;
      }

      const playerNames = state.players.map(p => p.name);
      const badges = state.players.reduce((s, p) => s + p.badges, 0);

      await sql`
        INSERT INTO adventures (id, state, name, player_names, badges, last_played_at)
        VALUES (${state.id}, ${JSON.stringify(state)}::jsonb, ${state.name}, ${playerNames}, ${badges}, ${state.lastPlayedAt})
        ON CONFLICT (id) DO UPDATE SET
          state = ${JSON.stringify(state)}::jsonb,
          name = ${state.name},
          player_names = ${playerNames},
          badges = ${badges},
          last_played_at = ${state.lastPlayedAt}
      `;

      res.json({ ok: true });
      return;
    }

    // PATCH — archive/unarchive
    if (method === 'PATCH') {
      if (!id) {
        res.status(400).json({ error: 'Adventure id required' });
        return;
      }
      const { archived } = req.body;
      const result = await sql`
        UPDATE adventures SET archived = ${!!archived} WHERE id = ${id}
      `;
      res.json({ ok: true });
      return;
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Adventures API error:', err);
    res.status(500).json({ error: err.message });
  }
};
