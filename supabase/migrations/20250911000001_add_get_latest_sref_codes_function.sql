-- Create function to get latest version of each unique SREF code
CREATE OR REPLACE FUNCTION get_latest_sref_codes(limit_count INTEGER DEFAULT 20)
RETURNS TABLE (
  id UUID,
  code_value TEXT,
  sv_version TEXT,
  title TEXT,
  copy_count INTEGER,
  upvotes INTEGER,
  downvotes INTEGER,
  save_count INTEGER,
  created_at TIMESTAMP WITH TIME ZONE,
  code_images JSON,
  code_tags JSON
) AS $$
BEGIN
  RETURN QUERY
  WITH latest_codes AS (
    SELECT 
      sc.id,
      sc.code_value,
      sc.sv_version,
      sc.title,
      sc.copy_count,
      sc.upvotes,
      sc.downvotes,
      sc.save_count,
      sc.created_at,
      ROW_NUMBER() OVER (PARTITION BY sc.code_value, sc.sv_version ORDER BY sc.created_at DESC) as rn
    FROM sref_codes sc
  ),
  filtered_codes AS (
    SELECT lc.*
    FROM latest_codes lc
    WHERE lc.rn = 1
    ORDER BY lc.created_at DESC
    LIMIT limit_count
  )
  SELECT 
    fc.id,
    fc.code_value,
    fc.sv_version,
    fc.title,
    fc.copy_count,
    fc.upvotes,
    fc.downvotes,
    fc.save_count,
    fc.created_at,
    COALESCE(
      (SELECT JSON_AGG(
        JSON_BUILD_OBJECT(
          'id', ci.id,
          'image_url', ci.image_url,
          'position', ci.position
        ) ORDER BY ci.position
      )
      FROM code_images ci 
      WHERE ci.sref_code_id = fc.id), 
      '[]'::json
    ) as code_images,
    COALESCE(
      (SELECT JSON_AGG(
        JSON_BUILD_OBJECT(
          'id', ct.id,
          'tag', ct.tag
        )
      )
      FROM code_tags ct 
      WHERE ct.sref_code_id = fc.id), 
      '[]'::json
    ) as code_tags
  FROM filtered_codes fc;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_latest_sref_codes TO authenticated;
GRANT EXECUTE ON FUNCTION get_latest_sref_codes TO anon;