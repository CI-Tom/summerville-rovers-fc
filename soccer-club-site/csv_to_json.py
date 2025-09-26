"""
csv_to_json.py — Helper script to convert club data (fixtures, table, news) from CSV to JSON.
Usage:
  python csv_to_json.py fixtures.csv data/fixtures.json --schema fixtures
  python csv_to_json.py table.csv data/table.json --schema table
  python csv_to_json.py news.csv data/news.json --schema news

CSV formats:

fixtures.csv
date,comp,home,opponent,time
2025-10-04,League,TRUE,Eastfield United,15:00

table.csv
team,p,w,d,l,gf,ga,pts
Riverdale Rovers,6,4,1,1,11,6,13

news.csv
id,title,date,image,excerpt,url
1,Rovers edge Westhill in 2–1 away thriller,2025-09-21,images/news1.jpg,A late header...,

"""


import csv, json, argparse, sys

def parse_bool(s):
    if isinstance(s,bool): return s
    s = s.strip().lower()
    return s in ("1","true","t","yes","y")

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("src_csv")
    ap.add_argument("dst_json")
    ap.add_argument("--schema", choices=["fixtures","table","news"], required=True)
    args = ap.parse_args()

    rows = []
    with open(args.src_csv, newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for r in reader:
            if args.schema == "fixtures":
                rows.append({
                    "date": r["date"],
                    "comp": r.get("comp","League"),
                    "home": parse_bool(r.get("home","")),
                    "opponent": r["opponent"],
                    "time": r.get("time","")
                })
            elif args.schema == "table":
                rows.append({
                    "team": r["team"],
                    "p": int(r["p"]), "w": int(r["w"]), "d": int(r["d"]), "l": int(r["l"]),
                    "gf": int(r["gf"]), "ga": int(r["ga"]), "pts": int(r["pts"])
                })
            elif args.schema == "news":
                rows.append({
                    "id": int(r["id"]),
                    "title": r["title"],
                    "date": r["date"],
                    "image": r.get("image",""),
                    "excerpt": r.get("excerpt",""),
                    "url": r.get("url","")
                })
    with open(args.dst_json, "w", encoding="utf-8") as out:
        json.dump(rows, out, ensure_ascii=False, indent=2)
    print(f"Wrote {len(rows)} records -> {args.dst_json}")

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print("Error:", e, file=sys.stderr)
        sys.exit(1)
